package com.moneymeetsvalue.StockHistoricalData;

import java.math.BigDecimal;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class StockHistoricalDataTwo {

    private static final HttpClient httpClient = HttpClient.newHttpClient();

    private static ObjectMapper objectMapper = new ObjectMapper();
    private LinkedHashMap<String, LinkedHashMap<String, Double>> stockHistoricalDataMap;
    private LinkedHashMap<Integer, Object> costOfGoodsAndServicesSold;
    // private LinkedHashMap<Integer, Object> grossProfit;
    // private LinkedHashMap<Integer, Object> netIncome;
    // private LinkedHashMap<Integer, Object> cashFromOperations;
    // private LinkedHashMap<Integer, Object> capitalExpenditures;
    // private LinkedHashMap<Integer, Object> marketCapitalization;
    // private LinkedHashMap<Integer, Object> sharesOutstanding;

    public StockHistoricalDataTwo(String cik) {
        this.costOfGoodsAndServicesSold = calculateYearlyDataFromQuarterlyData(cik, "costOfGoodsAndServicesSold");
        // this.grossProfit = calculateYearlyDataFromQuarterlyData(cik, "grossProfit");
        // this.netIncome = calculateYearlyDataFromQuarterlyData(cik, "netIncome");
        // this.cashFromOperations = calculateYearlyDataFromQuarterlyData(cik,
        // "cashFromOperations");
        // this.capitalExpenditures = calculateYearlyDataFromQuarterlyData(cik,
        // "capitalExpenditures");
        // this.marketCapitalization = calculateYearlyDataFromQuarterlyData(cik,
        // "marketCapitalization");
        // this.sharesOutstanding = calculateYearlyDataFromQuarterlyData(cik,
        // "sharesOutstanding");
    }

    private ArrayList<LinkedHashMap<String, Object>> fetchDataFromApi(String cik, String type) {
        HttpRequest httpRequest = createHttpRequest(buildUrl(cik, type));

        CompletableFuture<HttpResponse<String>> completableFuture = createCompletableFuture(httpRequest);

        try {
            HttpResponse<String> httpResponse = completableFuture.get();

            if (type.equals("sharesOutstanding")) {
                JsonNode data = objectMapper.readTree(httpResponse.body())
                        .get("units")
                        .get("shares");

                ArrayList<LinkedHashMap<String, Object>> dataPojo = objectMapper
                        .convertValue(data,
                                new TypeReference<ArrayList<LinkedHashMap<String, Object>>>() {
                                });

                Collections.reverse(dataPojo);
                return dataPojo;
            }
            JsonNode data = objectMapper.readTree(httpResponse.body())
                    .get("units")
                    .get("USD");

            ArrayList<LinkedHashMap<String, Object>> dataPojo = objectMapper
                    .convertValue(data,
                            new TypeReference<ArrayList<LinkedHashMap<String, Object>>>() {
                            });

            Collections.reverse(dataPojo);
            return filterArrayList(dataPojo);
        } catch (InterruptedException | ExecutionException |

                JsonProcessingException e) {
            return new ArrayList<LinkedHashMap<String, Object>>();
        }
    }

    private HttpRequest createHttpRequest(String url) {
        return HttpRequest.newBuilder(URI
                .create(url))
                .build();
    }

    private String buildUrl(String cik, String type) {
        String url = "https://data.sec.gov/api/xbrl/companyconcept/CIK%1$s/%2$s/%3$s.json";
        Map<String, String> map = createMap();

        if (type.equals("marketCapitalization")
                || type.equals("sharesOutstanding")) {
            return String.format(url, cik, "dei", map.get(type));
        }
        return String.format(url, cik, "us-gaap", map.get(type));

    }

    private Map<String, String> createMap() {
        return Map.of("costOfGoodsAndServicesSold",
                "CostOfGoodsAndServicesSold",
                "grossProfit", "GrossProfit",
                "netIncome", "NetIncomeLoss",
                "cashFromOperations", "NetCashProvidedByUsedInOperatingActivities",
                "capitalExpenditures", "PaymentsToAcquirePropertyPlantAndEquipment",
                "marketCapitalization", "EntityPublicFloat",
                "sharesOutstanding", "EntityCommonStockSharesOutstanding");
    }

    private CompletableFuture<HttpResponse<String>> createCompletableFuture(HttpRequest httpRequest) {
        return httpClient.sendAsync(httpRequest,
                HttpResponse.BodyHandlers.ofString());
    }

    private ArrayList<LinkedHashMap<String, Object>> filterArrayList(
            ArrayList<LinkedHashMap<String, Object>> dataPojo) {
        ArrayList<LinkedHashMap<String, Object>> filteredDataPojo = new ArrayList<LinkedHashMap<String, Object>>();

        for (LinkedHashMap<String, Object> item : dataPojo) {
            if ((item.get("frame") instanceof String)) {
                if (!(((String) item.get("frame")).contains("Q") && item.get("form").equals("10-K"))) {
                    filteredDataPojo.add(item);
                }
            }
        }

        for (LinkedHashMap<String, Object> item : filteredDataPojo) {
            System.out.println(item);
        }
        return filteredDataPojo;

    }

    private LinkedHashMap<Integer, Object> calculateYearlyDataFromQuarterlyData(String cik, String type) {
        ArrayList<LinkedHashMap<String, Object>> apiData = fetchDataFromApi(cik, type);
        LinkedHashMap<Integer, Object> yearlyData = new LinkedHashMap<>();
        double sum = 0.0;

        if (type.equals("marketCapitalization")) {

            for (int i = 0; i < apiData.size(); i++) {
                LinkedHashMap<String, Object> year = apiData.get(i);
                yearlyData.put(yearlyData.size() + 1, Double.valueOf(String.valueOf(year.get("val"))));
                if (yearlyData.size() >= 10) {
                    break;
                }
            }

        } else if (type.equals("sharesOutstanding")) {

        } else {
            for (int i = 0; i < apiData.size(); i++) {
                LinkedHashMap<String, Object> quarter = apiData.get(i);

                if (quarter.get("form").equals("10-Q")) {
                    System.out.println("summed " + String.valueOf(quarter.get("val")));
                    sum += Double.valueOf(String.valueOf(quarter.get("val")));
                } else if (quarter.get("form").equals("10-K") && !((String) quarter.get("frame")).contains("Q")
                        || quarter.get("form").equals("8-K")) {
                    double fourthQuarter = calculateFourthQuarter(i, apiData);
                    if (fourthQuarter == 0.0) {
                        yearlyData.put(yearlyData.size() + 1, "N/A");
                        sum = 0.0;
                    } else {

                        System.out.println("summed " + calculateFourthQuarter(i, apiData));
                        sum += calculateFourthQuarter(i, apiData);
                        yearlyData.put(yearlyData.size() + 1, sum);
                        sum = 0.0;
                    }
                }

                if (yearlyData.size() >= 10) {
                    break;
                }
            }
        }

        return yearlyData;
    }

    private double calculateFourthQuarter(int startingIndex, ArrayList<LinkedHashMap<String, Object>> quarterlyData) {
        double fourthQuarter = Double.valueOf(String.valueOf(quarterlyData.get(startingIndex).get("val")));

        for (int i = startingIndex + 1; i < startingIndex + 4; i++) {
            if (i >= quarterlyData.size()) {
                return 0.0;
            }
            LinkedHashMap<String, Object> quarter = quarterlyData.get(i);
            fourthQuarter -= Double.valueOf(String.valueOf(quarter.get("val")));
        }
        return fourthQuarter;
    }

    public LinkedHashMap<Integer, Object> getCostOfGoodsAndServicesSold() {
        return this.costOfGoodsAndServicesSold;
    }

    // public LinkedHashMap<Integer, Object> getGrossProfit() {
    // return this.grossProfit;
    // }

    // public LinkedHashMap<Integer, Object> getNetIncome() {
    // return this.netIncome;
    // }

    // public LinkedHashMap<Integer, Object> getCashFromOperations() {
    // return this.cashFromOperations;
    // }

    // public LinkedHashMap<Integer, Object> getCapitalExpenditures() {
    // return this.capitalExpenditures;
    // }

    // public LinkedHashMap<Integer, Object> getMarketCapitalization() {
    // return this.marketCapitalization;
    // }

    // public LinkedHashMap<Integer, Object> getSharesOutstanding() {
    // return this.sharesOutstanding;
    // }
}
