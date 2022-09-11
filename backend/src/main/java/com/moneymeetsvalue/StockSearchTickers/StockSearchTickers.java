package com.moneymeetsvalue.StockSearchTickers;

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

public class StockSearchTickers {

    /**
     * @stockSearchTickers is the object which contains the output from the API.
     * @objectMapper is a utility object which Jackson requires in order to
     *               serialize and manipulate the JSON received from the API, and
     *               the JSON we return to the client.
     * @httpClient is the HTTP client used to communicate with the API.
     */
    private JsonNode stockSearchTicker;
    private ObjectMapper objectMapper = new ObjectMapper();
    private static final HttpClient httpClient = HttpClient.newHttpClient();

    /**
     * Constructs an object which contains the API response in JSON format.
     * 
     * @param stockTicker is the stock ticker we are searching for passed to us by
     *                    the client through the URL.
     */
    public StockSearchTickers(String stockTicker) {
        this.stockSearchTicker = fetchSearchTickers(stockTicker);
    }

    /**
     * 
     * @param stockTicker is the stock ticker we are searching for passed to us by
     *                    the client through the URL.
     * 
     * @return a JsonNode object containing the data received from the API in JSON
     *         format.
     */
    private JsonNode fetchSearchTickers(String stockTicker) {
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

    /**
     * This method is used to create a HttpRequest object and sort the code with a
     * facade pattern.
     * 
     * @param stockTicker is the stock ticker we are searching for passed to us by
     *                    the client through the URL.
     * @return a HttpRequest object. Apart of the java.net.http module.
     */
    private HttpRequest createHttpRequest(String stockTicker) {
        return HttpRequest.newBuilder(URI
                .create(String.format(
                        "https://api.polygon.io/v3/reference/tickers?ticker.gte=%s&type=CS&market=stocks&active=true&sort=ticker&order=asc&limit=10",
                        stockTicker)))
                .header("Authorization", "Bearer tULgjkWUPeckwDCamEARFl68v2MAzsOf")
                .build();
    }

    /**
     * 
     * @param httpRequest object that contains the http request url and headers.
     * @return the response from the API.
     */
    private CompletableFuture<HttpResponse<String>> createCompletableFuture(HttpRequest httpRequest) {
        return httpClient.sendAsync(httpRequest,
                HttpResponse.BodyHandlers.ofString());
    }

    /**
     * 
     * @return LinkedHashMap<String,
     *         String> representation of the stock tickers and
     *         corresponding company names.
     *         We return a LinkedHashMap<String,
     *         String> in order to retain the original insertion order.
     */
    public LinkedHashMap<String, String> getStockSearchTickers() {
        LinkedHashMap<String, String> map = new LinkedHashMap<>();

        JsonNode results = this.stockSearchTicker.get("results");

        for (JsonNode result : results) {
            map.put(result.get("ticker").asText(), result.get("name").asText());
        }

        return map;
    }

}
