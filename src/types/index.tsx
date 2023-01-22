type CryptoSummaryType = {
    asset: string,
    total_quant: number,
    total_value: number,
}

type PurchaseType = {
    purchase_id: string,
    purchase_date: string,
    purchase_local: string,
    total_bought: number,
    purchase_medium_price: number,
    tax: number,
    remain_quant: number,
}

type PurchaseSold = {
    purchase_id: string,
    quant_sold: number,
    purchase_medium_price: number,
    purchase_date: string,
}

type SellType = {
    sell_id: string,
    sell_date: string,
    sell_local: string,
    quant_sold: number,
    received: number,
    aquisitionValue: number,
    purchases_sold: PurchaseSold[],
}

type SellTypeMonth = {
    sellDate: string,
    purchaseDate: string,
    aquisitionValue: number,
    quantSold: number,
    receivedValue: number,
    purchasesSold: PurchaseSold[],
}

/**
 * Responses types
 */

// Asset operations (individual sells)
type res1 = {
    asset: string, 
    purchases: PurchaseType[],
    sells: SellType[],
}

// Asset operations (monthly sells)
type res2 = {
    asset: string, 
    purchases: PurchaseType[],
    sells: SellTypeMonth[],
}

export type { CryptoSummaryType, PurchaseType, PurchaseSold, SellType, SellTypeMonth, res1, res2 }