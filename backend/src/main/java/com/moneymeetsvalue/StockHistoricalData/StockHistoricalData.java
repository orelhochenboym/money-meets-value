package com.moneymeetsvalue.StockHistoricalData;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.LinkedHashMap;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class StockHistoricalData {
    private JsonNode stockHistoricalData;
    private LinkedHashMap<String, LinkedHashMap<String, Double>> stockHistoricalDataMap;
    private ObjectMapper objectMapper = new ObjectMapper();
    private static final HttpClient httpClient = HttpClient.newHttpClient();

    public StockHistoricalData(String stockTicker) {
        this.stockHistoricalData = fetchStockHistoricalData(stockTicker);
        this.stockHistoricalDataMap = new LinkedHashMap<String, LinkedHashMap<String, Double>>();

    }

    private JsonNode fetchStockHistoricalData(String stockTicker) {
        HttpRequest httpRequest = createHttpRequest(stockTicker);

        CompletableFuture<HttpResponse<String>> completableFuture = createCompletableFuture(httpRequest);

        try {
            HttpResponse<String> httpResponse = completableFuture.get();

            while (httpResponse.headers().map().get(":status").get(0).equals("429")) {
                TimeUnit.SECONDS.sleep(60);
                completableFuture = createCompletableFuture(httpRequest);
                httpResponse = completableFuture.get();
            }

            return objectMapper.readTree(httpResponse.body());
        } catch (InterruptedException | ExecutionException | JsonProcessingException e) {
            return objectMapper.createObjectNode();
        }
    }

    private HttpRequest createHttpRequest(String stockTicker) {
        return HttpRequest.newBuilder(URI
                .create(String.format(
                        "https://api.polygon.io/vX/reference/financials?ticker=%s&timeframe=annual&include_sources=false&order=desc&limit=100&sort=period_of_report_date",
                        stockTicker)))
                .header("Authorization", "Bearer tULgjkWUPeckwDCamEARFl68v2MAzsOf")
                .build();
    }

    private CompletableFuture<HttpResponse<String>> createCompletableFuture(HttpRequest httpRequest) {
        return httpClient.sendAsync(httpRequest,
                HttpResponse.BodyHandlers.ofString());
    }

    public LinkedHashMap<String, LinkedHashMap<String, Double>> getStockHistoricalDataMap() {
        this.stockHistoricalDataMap.put("rg", calculateData("rg"));
        this.stockHistoricalDataMap.put("npm", calculateData("npm"));
        this.stockHistoricalDataMap.put("fcfm", calculateData("fcfm"));
        this.stockHistoricalDataMap.put("sb", calculateData("sb"));
        return this.stockHistoricalDataMap;

    }

    private LinkedHashMap<String, Double> calculateData(String data) {
        LinkedHashMap<String, Double> dataLinkedHashMap = new LinkedHashMap<>();
        switch (data) {
            case "rg":
                calculateRg(dataLinkedHashMap);
                break;
            case "npm":
                calculateNpm(dataLinkedHashMap);
                break;
            case "fcfm":
                calculateFcfm(dataLinkedHashMap);
                break;
            case "sb":
                calculateSb(dataLinkedHashMap);
                break;
            default:
                break;
        }
        return dataLinkedHashMap;
    }

    private void calculateSb(LinkedHashMap<String, Double> dataLinkedHashMap) {
        // BigDecimal nowNetIncome = extractData("income_statement", "net_income_loss",
        // 0);
        // BigDecimal nowEarningsPerShare = extractData("income_statement",
        // "diluted_earnings_per_share", 0);
        // BigDecimal nowSharesOutstanding = nowNetIncome.divide(nowEarningsPerShare, 2,
        // RoundingMode.HALF_UP);
        // System.out.println(nowSharesOutstanding);

        // BigDecimal yearOneNetIncome = extractData("income_statement",
        // "net_income_loss", 1);
        // BigDecimal yearOneEarningsPerShare = extractData("income_statement",
        // "diluted_earnings_per_share", 1);
        // BigDecimal yearOneSharesOutstanding =
        // yearOneNetIncome.divide(yearOneEarningsPerShare, 2, RoundingMode.HALF_UP);
        // System.out.println(yearOneSharesOutstanding);

        // BigDecimal yearFiveNetIncome = extractData("income_statement",
        // "net_income_loss", 4);
        // BigDecimal yearFiveEarningsPerShare = extractData("income_statement",
        // "diluted_earnings_per_share", 4);
        // BigDecimal yearFiveSharesOutstanding =
        // yearFiveNetIncome.divide(yearFiveEarningsPerShare, 2,
        // RoundingMode.HALF_UP);
        // System.out.println(yearFiveSharesOutstanding);

        // BigDecimal yearTenNetIncome = extractData("income_statement",
        // "net_income_loss", 9);
        // BigDecimal yearTenEarningsPerShare = extractData("income_statement",
        // "diluted_earnings_per_share", 9);
        // BigDecimal yearTenSharesOutstanding =
        // yearTenNetIncome.divide(yearTenEarningsPerShare, 2, RoundingMode.HALF_UP);
        // System.out.println(yearTenSharesOutstanding);

        // dataLinkedHashMap.put("yearOne", calculateCagr(yearOneSharesOutstanding,
        // nowSharesOutstanding, 1));
        // dataLinkedHashMap.put("yearFive", calculateCagr(yearFiveSharesOutstanding,
        // nowSharesOutstanding, 5));
        // dataLinkedHashMap.put("yearTen", calculateCagr(yearTenSharesOutstanding,
        // nowSharesOutstanding, 10));
        dataLinkedHashMap.put("yearOne",
                new BigDecimal(-101).setScale(2, RoundingMode.HALF_UP).doubleValue());
        dataLinkedHashMap.put("yearFive",
                new BigDecimal(-101).setScale(2, RoundingMode.HALF_UP).doubleValue());
        dataLinkedHashMap.put("yearTen",
                new BigDecimal(-101).setScale(2, RoundingMode.HALF_UP).doubleValue());
    }

    private void calculateFcfm(LinkedHashMap<String, Double> dataLinkedHashMap) {
        // double sum = 0.0;
        // for (int i = 0; i < 10; i++) {
        // BigDecimal cashFromOperations = extractData("cash_flow_statement",
        // "net_cash_flow_from_operating_activities", i);
        // BigDecimal revenues = extractData("income_statement", "revenues", i);
        // }
        dataLinkedHashMap.put("yearOne",
                new BigDecimal(-101).setScale(2, RoundingMode.HALF_UP).doubleValue());
        dataLinkedHashMap.put("yearFive",
                new BigDecimal(-101).setScale(2, RoundingMode.HALF_UP).doubleValue());
        dataLinkedHashMap.put("yearTen",
                new BigDecimal(-101).setScale(2, RoundingMode.HALF_UP).doubleValue());
    }

    private void calculateNpm(LinkedHashMap<String, Double> dataLinkedHashMap) {
        double sum = 0.0;
        for (int i = 0; i < 10; i++) {
            BigDecimal netIncome = extractData("income_statement", "net_income_loss", i);
            BigDecimal revenues = extractData("income_statement", "revenues", i);
            sum += netIncome.doubleValue() / revenues.doubleValue() * 100;
            switch (i) {
                case 0:
                    dataLinkedHashMap.put("yearOne",
                            new BigDecimal(sum).setScale(2, RoundingMode.HALF_UP).doubleValue());
                    break;
                case 4:
                    dataLinkedHashMap.put("yearFive",
                            new BigDecimal(sum / 5).setScale(2, RoundingMode.HALF_UP).doubleValue());
                    break;
                case 9:
                    dataLinkedHashMap.put("yearTen",
                            new BigDecimal(sum / 10).setScale(2, RoundingMode.HALF_UP).doubleValue());
                    break;
            }

        }
    }

    private void calculateRg(LinkedHashMap<String, Double> dataLinkedHashMap) {
        BigDecimal now = extractData("income_statement", "revenues", 0);
        BigDecimal yearOne = extractData("income_statement", "revenues", 1);
        BigDecimal yearFive = extractData("income_statement", "revenues", 4);
        BigDecimal yearTen = extractData("income_statement", "revenues", 9);
        double cagrYearOne = calculateCagr(yearOne, now, 1);
        double cagrYearFive = calculateCagr(yearFive, now, 5);
        double cagrYearTen = calculateCagr(yearTen, now, 10);
        dataLinkedHashMap.put("yearOne", cagrYearOne);
        dataLinkedHashMap.put("yearFive", cagrYearFive);
        dataLinkedHashMap.put("yearTen", cagrYearTen);
    }

    private BigDecimal extractData(String financialStatement, String valueToExtract, int year) {
        JsonNode financials = this.stockHistoricalData.get("results").get(year).get("financials");
        JsonNode statement = financials.get(financialStatement);
        BigDecimal extractedValue = new BigDecimal(statement.get(valueToExtract).get("value").asDouble());
        return extractedValue;
    }

    private double calculateCagr(BigDecimal startingValue, BigDecimal endingValue, int numberOfYears) {
        // The formula is CAGR = ((endingValue / startingValue) ^ (1 /numberOfYears) -
        // 1) * 100
        double cagr = (Math.pow((endingValue.doubleValue() / startingValue.doubleValue()), (1.0 / numberOfYears)) - 1)
                * 100;

        return new BigDecimal(cagr).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }
}
