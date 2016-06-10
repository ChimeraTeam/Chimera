package web;

import core.StatHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by gleb on 2/10/16.
 */
@Controller
public class StatController {

    private StatHolder statHolder = StatHolder.getStatHolder();

    @RequestMapping(value = "/stat", method = RequestMethod.GET)
    public String getData(Model model) {
        model.addAttribute("data", statHolder.getData());
        return "statistics";
    }

    @RequestMapping(value = "/stat", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> postData(HttpServletRequest req) {
        statHolder.put(req.getRemoteAddr());
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
