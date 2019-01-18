package com.appjishu.opscenter.grid.util;
import java.util.regex.*;

/**
 * @author paramvir
 */
public class ColumnHelper {

    public static boolean isValidColumn(String dataIndx) {
        String pattern = "^[a-z,A-Z,_]*$";

        Pattern r = Pattern.compile(pattern);

        Matcher m = r.matcher(dataIndx);
        if (m.find()) {
            return true;
        } else {
            return false;
        }
    }
}