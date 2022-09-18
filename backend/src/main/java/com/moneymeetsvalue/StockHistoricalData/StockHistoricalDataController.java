package com.moneymeetsvalue.StockHistoricalData;

import java.util.ArrayList;
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

    /**
     * 
     * Revenue = Cost of Goods and Services Sold + Gross Profit :
     * Cost of Goods and Services Sold -
     * https://data.sec.gov/api/xbrl/companyconcept/CIK####/us-gaap/CostOfGoodsAndServicesSold.json
     * Gross Profit -
     * https://data.sec.gov/api/xbrl/companyconcept/CIK####/us-gaap/GrossProfit.json
     * 
     * Net Profit Margin = Net Income / Revenue * 100 :
     * Net Income -
     * https://data.sec.gov/api/xbrl/companyconcept/CIK####/us-gaap/NetIncomeLoss.json
     * 
     * Free Cash Flow Margin = Net Income / Free Cash Flow:
     * Free Cash Flow = Cash from Operations - Capital Expenditures :
     * Cash from Operations -
     * https://data.sec.gov/api/xbrl/companyconcept/CIK####/us-gaap/NetCashProvidedByUsedInOperatingActivities.json
     * Capital Expenditures -
     * https://data.sec.gov/api/xbrl/companyconcept/CIK0000320193/us-gaap/PaymentsToAcquirePropertyPlantAndEquipment.json
     * 
     * P/E = Market Capitalization / Net Income:
     * Market Capitalization -
     * https://data.sec.gov/api/xbrl/companyconcept/CIK####/dei/EntityPublicFloat.json
     * 
     * P/FCF = Market Capitalization / Free Cash Flow:
     * 
     * Shares Outstanding -
     * https://data.sec.gov/api/xbrl/companyconcept/CIK####/dei/EntityCommonStockSharesOutstanding.json
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * @param stockTicker
     * @return
     */
    @GetMapping("{cik}")
    public LinkedHashMap<String, LinkedHashMap<Integer, String>> search(@PathVariable String cik) {
        // return new StockHistoricalData(cik).getStockHistoricalDataMap();
        return new StockHistoricalDataThree(cik).getStockHistoricalDataMap();
    }

}