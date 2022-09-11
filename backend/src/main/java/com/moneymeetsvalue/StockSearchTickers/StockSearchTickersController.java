package com.moneymeetsvalue.StockSearchTickers;

import java.util.LinkedHashMap;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @CrossOrigin annotation handles CORS exceptions. It allows requests from
 *              different entities in the same origin.
 */
@CrossOrigin
@RestController
@RequestMapping("api/search")
public class StockSearchTickersController {

    /**
     * 
     * @param stockTicker is the stock ticker we are searching for passed to us by
     *                    the client through the URL.
     * @return a Map<String, String> representing the stock tickers that match
     *         the @param stockTicker and the full company name corresponding to the
     *         stock ticker.
     */
    @GetMapping("{stockTicker}")
    public LinkedHashMap<String, String> search(@PathVariable String stockTicker) {
        return new StockSearchTickers(stockTicker).getStockSearchTickers();
    }

}
