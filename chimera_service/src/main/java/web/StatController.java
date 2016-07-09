package web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import service.StatHolder;

import javax.servlet.http.HttpServletRequest;

import static org.apache.commons.lang3.StringUtils.EMPTY;

/**
 * Created by gleb on 2/10/16.
 */
@Controller
public class StatController {

    @Autowired
    private StatHolder statHolder;

    @RequestMapping(value = "/stat", method = RequestMethod.GET)
    public String getData(Model model) {
        model.addAttribute("data", statHolder.getData());
        return "statistics";
    }

    @RequestMapping(value = "/stat", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> postData(HttpServletRequest req) {
        statHolder.put(req.getRemoteAddr());
        return new ResponseEntity<>(EMPTY, HttpStatus.OK);
    }
}
