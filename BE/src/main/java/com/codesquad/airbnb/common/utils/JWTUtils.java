package com.codesquad.airbnb.common.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.SignatureVerificationException;

import java.sql.Date;
import java.time.LocalDate;

public class JWTUtils {

    private static Algorithm algorithm = Algorithm.HMAC256("secret");

    public static String createTokenByString(String payLoad, String string) {
        return JWT.create()
                .withIssuer("Jay")
                .withClaim(payLoad, string)
                .withExpiresAt(Date.valueOf(LocalDate.now().plusDays(1)))
                .sign(algorithm);
    }

    public static String getStringFromJWT(String payLoad, String token) throws SignatureVerificationException, JWTDecodeException {
        return JWT.require(algorithm)
                .build()
                .verify(token)
                .getClaim(payLoad)
                .asString();
    }

    private JWTUtils() {}
}
