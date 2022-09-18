package com.moneymeetsvalue.StockHistoricalData;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class StockHistoricalDataThree {

    private static final HttpClient httpClient = HttpClient.newHttpClient();

    private static ObjectMapper objectMapper = new ObjectMapper();
    private String cik;
    private CompletableFuture<HttpResponse<String>> costOfGoodsAndServicesSold;
    private CompletableFuture<HttpResponse<String>> grossProfit;
    private CompletableFuture<HttpResponse<String>> netIncome;
    private CompletableFuture<HttpResponse<String>> cashFromOperations;
    private CompletableFuture<HttpResponse<String>> capitalExpenditures;
    private CompletableFuture<HttpResponse<String>> marketCapitalization;
    private CompletableFuture<HttpResponse<String>> sharesOutstanding;
    private LinkedHashMap<String, LinkedHashMap<Integer, String>> stockHistoricalDataMap = new LinkedHashMap<String, LinkedHashMap<Integer, String>>();

    public StockHistoricalDataThree(String cik) {
        this.cik = cik;
        this.costOfGoodsAndServicesSold = fetchDataFromApi("costOfGoodsAndServicesSold");
        this.grossProfit = fetchDataFromApi("grossProfit");
        this.netIncome = fetchDataFromApi("netIncome");
        this.cashFromOperations = fetchDataFromApi("cashFromOperations");
        this.capitalExpenditures = fetchDataFromApi("capitalExpenditures");
        this.marketCapitalization = fetchDataFromApi("marketCapitalization");
        this.sharesOutstanding = fetchDataFromApi("sharesOutstanding");
    }

    private CompletableFuture<HttpResponse<String>> fetchDataFromApi(String type) {
        HttpRequest httpRequest = createHttpRequest(buildUrl(type));
        return createCompletableFuture(httpRequest);
    }

    private ArrayList<LinkedHashMap<String, String>> extractPojoFromApiData(String type,
            CompletableFuture<HttpResponse<String>> completableFuture) {
        // The Async function doesn't work as planned. Line 56 basically halts the
        // program each call. The problem is that its working in each variable, so the
        // program halts before conducting all the api calls, thus, negating the effect
        // of async calls.
        boolean isSharesOutstanding = type.equals("sharesOutstanding");

        try {
            HttpResponse<String> httpResponse = completableFuture.get();
            JsonNode data;
            if (isSharesOutstanding) {
                data = objectMapper.readTree(httpResponse.body()).get("units").get("shares");
            } else {
                data = objectMapper.readTree(httpResponse.body()).get("units").get("USD");
            }
            ArrayList<LinkedHashMap<String, String>> dataPojo = objectMapper
                    .convertValue(data, new TypeReference<ArrayList<LinkedHashMap<String, String>>>() {
                    });
            Collections.reverse(dataPojo);
            return dataPojo;
        } catch (InterruptedException | ExecutionException | JsonProcessingException e) {
            return new ArrayList<LinkedHashMap<String, String>>();
        }
    }

    private HttpRequest createHttpRequest(String url) {
        return HttpRequest.newBuilder(URI.create(url)).build();
    }

    private String buildUrl(String type) {
        String url = "https://data.sec.gov/api/xbrl/companyconcept/CIK%1$s/%2$s/%3$s.json";
        Map<String, String> map = createMap();

        boolean isMarketCapitalization = type.equals("marketCapitalization");
        boolean isSharesOutstanding = type.equals("sharesOutstanding");

        if (isMarketCapitalization || isSharesOutstanding) {
            return String.format(url, this.cik, "dei", map.get(type));
        }
        return String.format(url, this.cik, "us-gaap", map.get(type));

    }

    private Map<String, String> createMap() {
        return Map.of(
                "costOfGoodsAndServicesSold", "CostOfGoodsAndServicesSold",
                "grossProfit", "GrossProfit",
                "netIncome", "NetIncomeLoss",
                "cashFromOperations", "NetCashProvidedByUsedInOperatingActivities",
                "capitalExpenditures", "PaymentsToAcquirePropertyPlantAndEquipment",
                "marketCapitalization", "EntityPublicFloat",
                "sharesOutstanding", "EntityCommonStockSharesOutstanding");
    }

    private CompletableFuture<HttpResponse<String>> createCompletableFuture(HttpRequest httpRequest) {
        return httpClient.sendAsync(httpRequest, HttpResponse.BodyHandlers.ofString());
    }

    private TreeMap<String, TreeMap<String, String>> createQuarterlyDataMap(String type,
            CompletableFuture<HttpResponse<String>> completableFuture) {
        ArrayList<LinkedHashMap<String, String>> apiData = extractPojoFromApiData(type, completableFuture);
        TreeMap<String, TreeMap<String, String>> quarterlyData = new TreeMap<String, TreeMap<String, String>>(
                Collections.reverseOrder());

        for (int i = 0; i < apiData.size(); i++) {
            LinkedHashMap<String, String> item = apiData.get(i);
            boolean isFrameExists = item.get("frame") instanceof String;
            boolean isQuarterlyData = isFrameExists ? item.get("frame").contains("Q") : false;
            String year = isFrameExists ? item.get("frame").substring(2, 6) : null;
            String quarter = isQuarterlyData ? item.get("frame").substring(6, 8) : null;
            String value = isFrameExists ? item.get("val") : null;
            boolean isYearExists = isFrameExists ? quarterlyData.containsKey(year) : false;

            switch (type) {
                case "costOfGoodsAndServicesSold":
                    if (isQuarterlyData && isFrameExists && !isYearExists && quarterlyData.size() < 11) {
                        quarterlyData.put(year, new TreeMap<String, String>(Collections.reverseOrder()) {
                            {
                                put(quarter, value);
                            }
                        });

                    } else if (isQuarterlyData && isFrameExists && isYearExists) {
                        quarterlyData.get(year).put(quarter, value);
                    } else if (isFrameExists && !isQuarterlyData && !isYearExists && quarterlyData.size() < 11) {
                        String thirdQuarter = calculateMissingQuarter(i, apiData);
                        quarterlyData.put(year, new TreeMap<String, String>(Collections.reverseOrder()) {
                            {
                                put("Q3", thirdQuarter);
                            }
                        });
                    } else if (isFrameExists && !isQuarterlyData && isYearExists) {
                        String thirdQuarter = calculateMissingQuarter(i, apiData);
                        quarterlyData.get(year).put("Q3", thirdQuarter);
                    }
                    break;

                case "grossProfit":
                    if (isQuarterlyData && isFrameExists && !isYearExists && quarterlyData.size() < 11) {
                        quarterlyData.put(year, new TreeMap<String, String>(Collections.reverseOrder()) {
                            {
                                put(quarter, value);
                            }
                        });
                    } else if (isQuarterlyData && isFrameExists && isYearExists) {
                        quarterlyData.get(year).put(quarter, value);
                    } else if (isFrameExists && !isQuarterlyData && !isYearExists && quarterlyData.size() < 11) {
                        String thirdQuarter = calculateMissingQuarter(i, apiData);
                        quarterlyData.put(year, new TreeMap<String, String>(Collections.reverseOrder()) {
                            {
                                put("Q3", thirdQuarter);
                            }
                        });
                    } else if (isFrameExists && !isQuarterlyData && isYearExists) {
                        String thirdQuarter = calculateMissingQuarter(i, apiData);
                        quarterlyData.get(year).put("Q3", thirdQuarter);
                    }
                    break;

                case "netIncome":
                    if (isQuarterlyData && isFrameExists && !isYearExists && quarterlyData.size() < 11) {
                        quarterlyData.put(year, new TreeMap<String, String>(Collections.reverseOrder()) {
                            {
                                put(quarter, value);
                            }
                        });
                    } else if (isQuarterlyData && isFrameExists && isYearExists) {
                        quarterlyData.get(year).put(quarter, value);
                    } else if (isFrameExists && !isQuarterlyData && !isYearExists && quarterlyData.size() < 11) {
                        String thirdQuarter = calculateMissingQuarter(i, apiData);
                        quarterlyData.put(year, new TreeMap<String, String>(Collections.reverseOrder()) {
                            {
                                put("Q3", thirdQuarter);
                            }
                        });
                    } else if (isFrameExists && !isQuarterlyData && isYearExists) {
                        String thirdQuarter = calculateMissingQuarter(i, apiData);
                        quarterlyData.get(year).put("Q3", thirdQuarter);
                    }
                    break;

                case "cashFromOperations":
                    if (!isQuarterlyData && isFrameExists && quarterlyData.size() < 11) {
                        quarterlyData.put(year, new TreeMap<String, String>(Collections.reverseOrder()) {
                            {
                                put(year, value);
                            }
                        });
                    }
                    break;

                case "capitalExpenditures":
                    if (!isQuarterlyData && isFrameExists && quarterlyData.size() < 11) {
                        quarterlyData.put(year, new TreeMap<String, String>(Collections.reverseOrder()) {
                            {
                                put(year, value);
                            }
                        });
                    }
                    break;

                case "marketCapitalization":
                    if (isFrameExists && quarterlyData.size() < 11) {
                        quarterlyData.put(year, new TreeMap<String, String>(Collections.reverseOrder()) {
                            {
                                put(year, value);
                            }
                        });
                    } else if (isFrameExists && isYearExists) {
                        quarterlyData.get(year).put(year, value);
                    }
                    break;

                case "sharesOutstanding":
                    if (isQuarterlyData && isFrameExists && quarterlyData.size() < 1) {
                        quarterlyData.put(year, new TreeMap<String, String>(Collections.reverseOrder()) {
                            {
                                put(quarter, value);
                            }
                        });
                    }
                    break;

                default:
                    if (isQuarterlyData && isFrameExists && !isYearExists && quarterlyData.size() < 11) {
                        quarterlyData.put(year, new TreeMap<String, String>(Collections.reverseOrder()) {
                            {
                                put(quarter, value);
                            }
                        });
                    } else if (isQuarterlyData && isFrameExists && isYearExists) {
                        quarterlyData.get(year).put(quarter, value);
                    }
                    break;
            }
        }

        return quarterlyData;

    }

    private String calculateMissingQuarter(int startingIndex,
            ArrayList<LinkedHashMap<String, String>> apiData) {
        BigInteger fourthQuarter = new BigInteger(apiData.get(startingIndex).get("val"));
        int count = 0;
        for (int i = startingIndex + 1; i < apiData.size(); i++) {
            LinkedHashMap<String, String> item = apiData.get(i);
            boolean isFrameExists = item.get("frame") instanceof String;
            boolean isQuarterlyData = isFrameExists ? item.get("frame").contains("Q") : false;
            if (isFrameExists && isQuarterlyData) {
                BigInteger tempQuarterValue = new BigInteger(item.get("val"));
                fourthQuarter = fourthQuarter.subtract(tempQuarterValue);
                count++;
            }
            if (count >= 3) {
                break;
            }
        }
        return fourthQuarter.toString();
    }

    private TreeMap<Integer, String> sortDataByTtmYearly(TreeMap<String, TreeMap<String, String>> data) {
        TreeMap<Integer, String> sortedData = new TreeMap<Integer, String>();
        ArrayList<String> dataArrayList = new ArrayList<String>();

        Set<Map.Entry<String, TreeMap<String, String>>> yearlyEntrySet = data.entrySet();

        for (Map.Entry<String, TreeMap<String, String>> yearlyEntry : yearlyEntrySet) {
            Set<Map.Entry<String, String>> quarterlyEntrySet = yearlyEntry.getValue().entrySet();

            for (Object item : quarterlyEntrySet.toArray()) {
                BigInteger val = new BigInteger(String.valueOf(item).split("=")[1]);
                dataArrayList.add(val.toString());
            }
        }

        int count = 0, year = 1;
        BigInteger sum = new BigInteger("0");

        for (String item : dataArrayList) {
            sum = sum.add(new BigInteger(item));
            count++;
            if (count % 4 == 0) {
                sortedData.put(year, sum.toString());
                year++;
                sum = new BigInteger("0");
            }
        }
        return sortedData;
    }

    private TreeMap<Integer, String> sortDataByTtmSpecial(TreeMap<String, TreeMap<String, String>> data) {
        TreeMap<Integer, String> sortedData = new TreeMap<Integer, String>();
        ArrayList<String> dataArrayList = new ArrayList<String>();

        Set<Map.Entry<String, TreeMap<String, String>>> yearlyEntrySet = data.entrySet();

        for (Map.Entry<String, TreeMap<String, String>> yearlyEntry : yearlyEntrySet) {
            Set<Map.Entry<String, String>> quarterlyEntrySet = yearlyEntry.getValue().entrySet();

            for (Object item : quarterlyEntrySet.toArray()) {
                BigInteger val = new BigInteger(String.valueOf(item).split("=")[1]);
                dataArrayList.add(val.toString());
            }
        }

        int year = 1;
        for (String item : dataArrayList) {
            sortedData.put(year, item);
            year++;
        }
        return sortedData;
    }

    private double calculateCagr(String startingValue, String endingValue, int numberOfYears) {
        // The formula is CAGR = ((endingValue / startingValue) ^ (1 /numberOfYears) -
        // 1) * 100
        double cagr = (Math.pow((Double.valueOf(endingValue) / Double.valueOf(startingValue)), (1.0 / numberOfYears))
                - 1) * 100;

        return new BigDecimal(cagr).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

    public LinkedHashMap<String, LinkedHashMap<Integer, String>> getStockHistoricalDataMap() {
        this.stockHistoricalDataMap.put("rg", calculateRg());
        this.stockHistoricalDataMap.put("npm", calculateNpm());
        this.stockHistoricalDataMap.put("fcfm", calculateFcfm());
        this.stockHistoricalDataMap.put("pe", calculatePe());
        this.stockHistoricalDataMap.put("pfcf", calculatePfcf());
        return this.stockHistoricalDataMap;
    }

    private LinkedHashMap<Integer, String> calculateRg() {
        LinkedHashMap<Integer, String> rg = new LinkedHashMap<Integer, String>();
        TreeMap<Integer, String> costOfGoodsAndServicesSoldMap = getCostOfGoodsAndServicesSold();
        TreeMap<Integer, String> grossProfitMap = getGrossProfit();

        boolean isNowExists = costOfGoodsAndServicesSoldMap.containsKey(1) && grossProfitMap.containsKey(1);
        boolean isOneYearBackExists = costOfGoodsAndServicesSoldMap.containsKey(2) && grossProfitMap.containsKey(2);
        boolean isFiveYearBackExists = costOfGoodsAndServicesSoldMap.containsKey(5) && grossProfitMap.containsKey(5);
        boolean isTenYearBackExists = costOfGoodsAndServicesSoldMap.containsKey(10) && grossProfitMap.containsKey(10);

        if (!isNowExists) {
            rg.put(1, "N/A");
            rg.put(5, "N/A");
            rg.put(10, "N/A");
        } else if (isOneYearBackExists) {
            BigInteger revenueNow = new BigInteger(costOfGoodsAndServicesSoldMap.get(1))
                    .add(new BigInteger(grossProfitMap.get(1)));
            BigInteger revenue = new BigInteger(costOfGoodsAndServicesSoldMap.get(2))
                    .add(new BigInteger(grossProfitMap.get(2)));

            rg.put(1, String.valueOf(calculateCagr(revenue.toString(),
                    revenueNow.toString(), 1)));
        } else if (!isOneYearBackExists) {
            rg.put(1, "N/A");
        }
        if (isFiveYearBackExists) {
            BigInteger revenueNow = new BigInteger(costOfGoodsAndServicesSoldMap.get(1))
                    .add(new BigInteger(grossProfitMap.get(1)));
            BigInteger revenue = new BigInteger(costOfGoodsAndServicesSoldMap.get(5))
                    .add(new BigInteger(grossProfitMap.get(5)));

            rg.put(5, String.valueOf(calculateCagr(revenue.toString(),
                    revenueNow.toString(), 5)));
        } else if (!isFiveYearBackExists) {
            rg.put(5, "N/A");
        }
        if (isTenYearBackExists) {
            BigInteger revenueNow = new BigInteger(costOfGoodsAndServicesSoldMap.get(1))
                    .add(new BigInteger(grossProfitMap.get(1)));
            BigInteger revenue = new BigInteger(costOfGoodsAndServicesSoldMap.get(10))
                    .add(new BigInteger(grossProfitMap.get(10)));

            rg.put(10, String.valueOf(calculateCagr(revenue.toString(),
                    revenueNow.toString(), 10)));
        } else if (!isTenYearBackExists) {
            rg.put(10, "N/A");
        }

        return rg;
    }

    private LinkedHashMap<Integer, String> calculateNpm() {
        LinkedHashMap<Integer, String> npm = new LinkedHashMap<Integer, String>();
        TreeMap<Integer, String> costOfGoodsAndServicesSoldMap = getCostOfGoodsAndServicesSold();
        TreeMap<Integer, String> grossProfitMap = getGrossProfit();
        TreeMap<Integer, String> netIncomeMap = getNetIncome();

        boolean isRevenueNowExists = costOfGoodsAndServicesSoldMap.containsKey(1) && grossProfitMap.containsKey(1);
        boolean isRevenueOneYearBackExists = costOfGoodsAndServicesSoldMap.containsKey(2)
                && grossProfitMap.containsKey(2);
        boolean isRevenueFiveYearBackExists = costOfGoodsAndServicesSoldMap.containsKey(5)
                && grossProfitMap.containsKey(5);
        boolean isRevenueTenYearBackExists = costOfGoodsAndServicesSoldMap.containsKey(10)
                && grossProfitMap.containsKey(10);
        boolean isNetIncomeNowExists = netIncomeMap.containsKey(1);
        boolean isNetIncomeOneYearBackExists = netIncomeMap.containsKey(2);
        boolean isNetIncomeFiveYearBackExists = netIncomeMap.containsKey(5);
        boolean isNetIncomeTenYearBackExists = netIncomeMap.containsKey(10);

        if (!isRevenueNowExists || !isNetIncomeNowExists) {
            npm.put(1, "N/A");
            npm.put(5, "N/A");
            npm.put(10, "N/A");
        } else if (isRevenueOneYearBackExists && isNetIncomeOneYearBackExists) {
            BigDecimal revenue = new BigDecimal(costOfGoodsAndServicesSoldMap.get(1))
                    .add(new BigDecimal(grossProfitMap.get(1)));
            BigDecimal netIncome = new BigDecimal(netIncomeMap.get(1));
            BigDecimal division = netIncome.divide(revenue, 4, RoundingMode.HALF_UP).multiply(new BigDecimal("100"));

            npm.put(1, division.setScale(2, RoundingMode.HALF_UP).toString());
        } else if (!isRevenueOneYearBackExists || !isNetIncomeOneYearBackExists) {
            npm.put(1, "N/A");
        }
        if (isRevenueFiveYearBackExists && isNetIncomeFiveYearBackExists) {
            BigDecimal revenue = new BigDecimal(sumMapItems(costOfGoodsAndServicesSoldMap, 5))
                    .add(new BigDecimal(sumMapItems(grossProfitMap, 5)));
            BigDecimal netIncome = new BigDecimal(sumMapItems(netIncomeMap, 5));
            BigDecimal division = netIncome.divide(revenue, 4, RoundingMode.HALF_UP).multiply(new BigDecimal("100"));

            npm.put(5, division.setScale(2, RoundingMode.HALF_UP).toString());
        } else if (!isRevenueFiveYearBackExists || !isNetIncomeFiveYearBackExists) {
            npm.put(5, "N/A");
        }
        if (isRevenueTenYearBackExists && isNetIncomeTenYearBackExists) {
            BigDecimal revenue = new BigDecimal(sumMapItems(costOfGoodsAndServicesSoldMap, 10))
                    .add(new BigDecimal(sumMapItems(grossProfitMap, 10)));
            BigDecimal netIncome = new BigDecimal(sumMapItems(netIncomeMap, 10));
            BigDecimal division = netIncome.divide(revenue, 4, RoundingMode.HALF_UP).multiply(new BigDecimal("100"));

            npm.put(10, division.setScale(2, RoundingMode.HALF_UP).toString());
        } else if (!isRevenueTenYearBackExists || !isNetIncomeTenYearBackExists) {
            npm.put(10, "N/A");
        }

        return npm;
    }

    private LinkedHashMap<Integer, String> calculateFcfm() {
        LinkedHashMap<Integer, String> fcfm = new LinkedHashMap<Integer, String>();
        TreeMap<Integer, String> costOfGoodsAndServicesSoldMap = getCostOfGoodsAndServicesSold();
        TreeMap<Integer, String> grossProfitMap = getGrossProfit();
        TreeMap<Integer, String> cashFromOperationMap = getCashFromOperations();
        TreeMap<Integer, String> capitalExpendituresMap = getCapitalExpenditures();

        boolean isRevenueNowExists = costOfGoodsAndServicesSoldMap.containsKey(1) && grossProfitMap.containsKey(1);
        boolean isRevenueOneYearBackExists = costOfGoodsAndServicesSoldMap.containsKey(2)
                && grossProfitMap.containsKey(2);
        boolean isRevenueFiveYearBackExists = costOfGoodsAndServicesSoldMap.containsKey(5)
                && grossProfitMap.containsKey(5);
        boolean isRevenueTenYearBackExists = costOfGoodsAndServicesSoldMap.containsKey(10)
                && grossProfitMap.containsKey(10);
        boolean isFreeCashFlowNowExists = cashFromOperationMap.containsKey(1) && capitalExpendituresMap.containsKey(1);
        boolean isFreeCashFlowOneYearBackExists = cashFromOperationMap.containsKey(2)
                && capitalExpendituresMap.containsKey(2);
        boolean isFreeCashFlowFiveYearBackExists = cashFromOperationMap.containsKey(5)
                && capitalExpendituresMap.containsKey(5);
        boolean isFreeCashFlowTenYearBackExists = cashFromOperationMap.containsKey(10)
                && capitalExpendituresMap.containsKey(10);

        if (!isRevenueNowExists || !isFreeCashFlowNowExists) {
            fcfm.put(1, "N/A");
            fcfm.put(5, "N/A");
            fcfm.put(10, "N/A");
        } else if (isRevenueOneYearBackExists && isFreeCashFlowOneYearBackExists) {
            BigDecimal revenue = new BigDecimal(costOfGoodsAndServicesSoldMap.get(1))
                    .add(new BigDecimal(grossProfitMap.get(1)));
            BigDecimal freeCashFlow = new BigDecimal(cashFromOperationMap.get(1))
                    .subtract(new BigDecimal(capitalExpendituresMap.get(1)));
            BigDecimal division = freeCashFlow.divide(revenue, 4, RoundingMode.HALF_UP).multiply(new BigDecimal("100"));

            fcfm.put(1, division.setScale(2, RoundingMode.HALF_UP).toString());
        } else if (!isRevenueOneYearBackExists || !isFreeCashFlowOneYearBackExists) {
            fcfm.put(1, "N/A");
        }
        if (isRevenueFiveYearBackExists && isFreeCashFlowFiveYearBackExists) {
            BigDecimal revenue = new BigDecimal(sumMapItems(costOfGoodsAndServicesSoldMap, 5))
                    .add(new BigDecimal(sumMapItems(grossProfitMap, 5)));
            BigDecimal freeCashFlow = new BigDecimal(sumMapItems(cashFromOperationMap, 5))
                    .subtract(new BigDecimal(sumMapItems(capitalExpendituresMap, 5)));
            BigDecimal division = freeCashFlow.divide(revenue, 4, RoundingMode.HALF_UP).multiply(new BigDecimal("100"));

            fcfm.put(5, division.setScale(2, RoundingMode.HALF_UP).toString());
        } else if (!isRevenueFiveYearBackExists || !isFreeCashFlowFiveYearBackExists) {
            fcfm.put(5, "N/A");
        }
        if (isRevenueTenYearBackExists && isFreeCashFlowTenYearBackExists) {
            BigDecimal revenue = new BigDecimal(sumMapItems(costOfGoodsAndServicesSoldMap, 10))
                    .add(new BigDecimal(sumMapItems(grossProfitMap, 10)));
            BigDecimal freeCashFlow = new BigDecimal(sumMapItems(cashFromOperationMap, 10))
                    .subtract(new BigDecimal(sumMapItems(capitalExpendituresMap, 10)));
            BigDecimal division = freeCashFlow.divide(revenue, 4, RoundingMode.HALF_UP).multiply(new BigDecimal("100"));

            fcfm.put(10, division.setScale(2, RoundingMode.HALF_UP).toString());
        } else if (!isRevenueTenYearBackExists || !isFreeCashFlowTenYearBackExists) {
            fcfm.put(10, "N/A");
        }

        return fcfm;
    }

    private LinkedHashMap<Integer, String> calculatePe() {
        LinkedHashMap<Integer, String> pe = new LinkedHashMap<Integer, String>();
        TreeMap<Integer, String> marketCapitalizationMap = getMarketCapitalization();
        TreeMap<Integer, String> netIncomeMap = getNetIncome();

        boolean isMarketCapitalizationNowExists = marketCapitalizationMap.containsKey(1);
        boolean isMarketCapitalizationOneYearBackExists = marketCapitalizationMap.containsKey(2);
        boolean isMarketCapitalizationFiveYearBackExists = marketCapitalizationMap.containsKey(5);
        boolean isMarketCapitalizationTenYearBackExists = marketCapitalizationMap.containsKey(10);
        boolean isNetIncomeNowExists = netIncomeMap.containsKey(1);
        boolean isNetIncomeOneYearBackExists = netIncomeMap.containsKey(2);
        boolean isNetIncomeFiveYearBackExists = netIncomeMap.containsKey(5);
        boolean isNetIncomeTenYearBackExists = netIncomeMap.containsKey(10);

        if (!isMarketCapitalizationNowExists || !isNetIncomeNowExists) {
            pe.put(1, "N/A");
            pe.put(5, "N/A");
            pe.put(10, "N/A");
        } else if (isMarketCapitalizationOneYearBackExists && isNetIncomeOneYearBackExists) {
            BigDecimal marketCapitalization = new BigDecimal(marketCapitalizationMap.get(1));
            BigDecimal netIncome = new BigDecimal(netIncomeMap.get(1));
            BigDecimal division = marketCapitalization.divide(netIncome, 4, RoundingMode.HALF_UP);

            pe.put(1, division.setScale(2, RoundingMode.HALF_UP).toString());
        } else if (!isMarketCapitalizationOneYearBackExists || !isNetIncomeOneYearBackExists) {
            pe.put(1, "N/A");
        }
        if (isMarketCapitalizationFiveYearBackExists && isNetIncomeFiveYearBackExists) {
            BigDecimal marketCapitalization = new BigDecimal(sumMapItems(marketCapitalizationMap, 5));
            BigDecimal netIncome = new BigDecimal(sumMapItems(netIncomeMap, 5));
            BigDecimal division = marketCapitalization.divide(netIncome, 4, RoundingMode.HALF_UP);

            pe.put(5, division.setScale(2, RoundingMode.HALF_UP).toString());
        } else if (!isMarketCapitalizationFiveYearBackExists || !isNetIncomeFiveYearBackExists) {
            pe.put(5, "N/A");
        }
        if (isMarketCapitalizationTenYearBackExists && isNetIncomeTenYearBackExists) {
            BigDecimal marketCapitalization = new BigDecimal(sumMapItems(marketCapitalizationMap, 10));
            BigDecimal netIncome = new BigDecimal(sumMapItems(netIncomeMap, 10));
            BigDecimal division = marketCapitalization.divide(netIncome, 4, RoundingMode.HALF_UP);

            pe.put(10, division.setScale(2, RoundingMode.HALF_UP).toString());
        } else if (!isMarketCapitalizationTenYearBackExists || !isNetIncomeTenYearBackExists) {
            pe.put(10, "N/A");
        }

        return pe;
    }

    private LinkedHashMap<Integer, String> calculatePfcf() {
        LinkedHashMap<Integer, String> pfcf = new LinkedHashMap<Integer, String>();
        TreeMap<Integer, String> marketCapitalizationMap = getMarketCapitalization();
        TreeMap<Integer, String> cashFromOperationMap = getCashFromOperations();
        TreeMap<Integer, String> capitalExpendituresMap = getCapitalExpenditures();

        boolean isMarketCapitalizationNowExists = marketCapitalizationMap.containsKey(1);
        boolean isMarketCapitalizationOneYearBackExists = marketCapitalizationMap.containsKey(2);
        boolean isMarketCapitalizationFiveYearBackExists = marketCapitalizationMap.containsKey(5);
        boolean isMarketCapitalizationTenYearBackExists = marketCapitalizationMap.containsKey(10);
        boolean isFreeCashFlowNowExists = cashFromOperationMap.containsKey(1) && capitalExpendituresMap.containsKey(1);
        boolean isFreeCashFlowOneYearBackExists = cashFromOperationMap.containsKey(2)
                && capitalExpendituresMap.containsKey(2);
        boolean isFreeCashFlowFiveYearBackExists = cashFromOperationMap.containsKey(5)
                && capitalExpendituresMap.containsKey(5);
        boolean isFreeCashFlowTenYearBackExists = cashFromOperationMap.containsKey(10)
                && capitalExpendituresMap.containsKey(10);

        if (!isMarketCapitalizationNowExists || !isFreeCashFlowNowExists) {
            pfcf.put(1, "N/A");
            pfcf.put(5, "N/A");
            pfcf.put(10, "N/A");
        } else if (isMarketCapitalizationOneYearBackExists && isFreeCashFlowOneYearBackExists) {
            BigDecimal marketCapitalization = new BigDecimal(marketCapitalizationMap.get(1));
            BigDecimal freeCashFlow = new BigDecimal(cashFromOperationMap.get(1))
                    .subtract(new BigDecimal(capitalExpendituresMap.get(1)));
            BigDecimal division = marketCapitalization.divide(freeCashFlow, 4, RoundingMode.HALF_UP);

            pfcf.put(1, division.setScale(2, RoundingMode.HALF_UP).toString());
        } else if (!isMarketCapitalizationOneYearBackExists || !isFreeCashFlowOneYearBackExists) {
            pfcf.put(1, "N/A");
        }
        if (isMarketCapitalizationFiveYearBackExists && isFreeCashFlowFiveYearBackExists) {
            BigDecimal marketCapitalization = new BigDecimal(sumMapItems(marketCapitalizationMap, 5));
            BigDecimal freeCashFlow = new BigDecimal(sumMapItems(cashFromOperationMap, 5))
                    .subtract(new BigDecimal(sumMapItems(capitalExpendituresMap, 5)));
            BigDecimal division = marketCapitalization.divide(freeCashFlow, 4, RoundingMode.HALF_UP);

            pfcf.put(5, division.setScale(2, RoundingMode.HALF_UP).toString());
        } else if (!isMarketCapitalizationFiveYearBackExists || !isFreeCashFlowFiveYearBackExists) {
            pfcf.put(5, "N/A");
        }
        if (isMarketCapitalizationTenYearBackExists && isFreeCashFlowTenYearBackExists) {
            BigDecimal marketCapitalization = new BigDecimal(sumMapItems(marketCapitalizationMap, 10));
            BigDecimal freeCashFlow = new BigDecimal(sumMapItems(cashFromOperationMap, 10))
                    .subtract(new BigDecimal(sumMapItems(capitalExpendituresMap, 10)));
            BigDecimal division = marketCapitalization.divide(freeCashFlow, 4, RoundingMode.HALF_UP);

            pfcf.put(10, division.setScale(2, RoundingMode.HALF_UP).toString());
        } else if (!isMarketCapitalizationTenYearBackExists || !isFreeCashFlowTenYearBackExists) {
            pfcf.put(10, "N/A");
        }

        return pfcf;
    }

    private String sumMapItems(TreeMap<Integer, String> map, int years) {
        BigDecimal sum = new BigDecimal("0");

        for (int i = 1; i <= years; i++) {
            sum = sum.add(new BigDecimal(map.get(i)));
        }
        BigDecimal division = sum.divide(new BigDecimal(String.valueOf(years)));

        return division.setScale(2, RoundingMode.HALF_UP).toString();
    }

    public TreeMap<Integer, String> getCostOfGoodsAndServicesSold() {
        return sortDataByTtmYearly(
                createQuarterlyDataMap("costOfGoodsAndServicesSold", this.costOfGoodsAndServicesSold));
    }

    public TreeMap<Integer, String> getGrossProfit() {
        return sortDataByTtmYearly(createQuarterlyDataMap("grossProfit", this.grossProfit));
    }

    public TreeMap<Integer, String> getNetIncome() {
        return sortDataByTtmYearly(createQuarterlyDataMap("netIncome", this.netIncome));
    }

    public TreeMap<Integer, String> getCashFromOperations() {
        return sortDataByTtmSpecial(createQuarterlyDataMap("cashFromOperations", this.cashFromOperations));
    }

    public TreeMap<Integer, String> getCapitalExpenditures() {
        return sortDataByTtmSpecial(createQuarterlyDataMap("capitalExpenditures", this.capitalExpenditures));
    }

    public TreeMap<Integer, String> getMarketCapitalization() {
        return sortDataByTtmSpecial(createQuarterlyDataMap("marketCapitalization", this.marketCapitalization));
    }

    public TreeMap<Integer, String> getSharesOutstanding() {
        return sortDataByTtmSpecial(createQuarterlyDataMap("sharesOutstanding", this.sharesOutstanding));
    }
}
