package com.moneymeetsvalue.StockHistoricalData;

import java.util.LinkedHashMap;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("api/data")
public class StockHistoricalDataController {

    @GetMapping("{stockTicker}")
    public LinkedHashMap<String, LinkedHashMap<String, Double>> search(@PathVariable String stockTicker) {
        return new StockHistoricalData(stockTicker).getStockHistoricalDataMap();
    }

}