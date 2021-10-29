package mn.num.saruul.jobBrokerage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@CrossOrigin
public class MainController {
	
	@GetMapping("/test")
	public String testMethod() {
		
		return null;
	}
}
