package mn.num.saruul.jobBrokerage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mn.num.saruul.jobBrokerage.dao.UserDAO;

@Controller
@RestController
@CrossOrigin
@RequestMapping("/home")
public class HomeController {

	@Autowired
	UserDAO userDAO;
	
}
