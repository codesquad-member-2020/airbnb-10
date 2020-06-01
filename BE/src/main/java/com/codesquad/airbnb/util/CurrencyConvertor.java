package com.codesquad.airbnb.util;

public class CurrencyConvertor {

    public static final float EXCHANGE_RATE_FROM_USD_TO_KRW = 1231.54f;

    public static int calculateCurrency(float dollar) {
        return (int)(dollar * EXCHANGE_RATE_FROM_USD_TO_KRW);
    }
}
