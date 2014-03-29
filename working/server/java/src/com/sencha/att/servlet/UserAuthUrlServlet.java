package com.sencha.att.servlet;

import java.io.IOException;
import java.io.Writer;
import java.net.URLEncoder;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sencha.att.AttConstants;
import com.sencha.att.provider.TokenResponse;

/**
 * This class processes requests to the userAuthUrl endpoint
 * 
 * @class com.sencha.att.servlet.UserAuthUrlServlet
 */
public class UserAuthUrlServlet extends HttpServlet {
    private static final long serialVersionUID = 1L; // first version of this
                                                     // servlet
    private static Logger log = Logger
            .getLogger(AttConstants.SERVICEPROVIDERLOGGER);

    /*
     * @see HttpServlet#HttpServlet()
     */
    public UserAuthUrlServlet() {
        super();
    }

    /**
     * Handle GET requests for an URL to initiate user-specific service
     * authorization.
     * 
     * @method doGet
     * 
     */
    @Override
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        try {
            String scope = request.getParameter("scope");
            if (scope == null) {
                throw new RuntimeException(
                        "'scope' querystring parameter required");
            }

            String encodedScope = URLEncoder.encode(scope, "UTF-8");

            String encodedReturnUrl = request.getParameter("returnUrl");
            if (encodedReturnUrl == null) {
                throw new RuntimeException(
                        "'returnUrl' querystring parameter required");
            }

            String callbackHandler = AttConstants.CALLBACK_SERVER + "?scope="
                    + encodedScope + "&returnUrl=" + encodedReturnUrl;

            String url = AttConstants.HOST + "/oauth/authorize?" + "scope="
                    + encodedScope + "&client_id="
                    + URLEncoder.encode(AttConstants.CLIENTIDSTRING, "UTF-8")
                    + "&redirect_uri="
                    + URLEncoder.encode(callbackHandler, "UTF-8");

            log.info("oauthUrl redirect URL: " + url);
            response.setContentType("application/json");
            Writer writer = response.getWriter();
            try {
                writer.write("{\"url\":\"" + url + "\"}");
            } finally {
                writer.close();
            }
        } catch (Exception se) {
            try {
                log(se.toString());
                se.printStackTrace();
                response.reset();
                response.setStatus(500);
                response.setContentType("application/json");
                Writer writer = response.getWriter();
                try {
                    TokenResponse.getResponse(se).write(writer);
                } finally {
                    writer.close();
                }
            } catch (Exception e) {
                log(se.getMessage());
                e.printStackTrace();
            }
        }
    }
}
