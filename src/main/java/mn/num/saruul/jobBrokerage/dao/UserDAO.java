package mn.num.saruul.jobBrokerage.dao;

import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.User;
import mn.num.saruul.jobBrokerage.repos.ProfileRepository;
import mn.num.saruul.jobBrokerage.repos.UserRepository;

@Repository
@Transactional
public class UserDAO {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ProfileRepository profileRepository;
	
	public Iterable<?> allUsers() {
		return userRepository.findAll();
	}
	
	public void saveOrUpdateUser(User user) {
		userRepository.save(user);
	}
	
	public Iterable<?> usersByPage(int pageNo, int pageSize, String sortBy) {
		Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
		Page<?> pagedResult = userRepository.findAll(pageable);
		
		if (pagedResult.hasContent()) {
			return pagedResult.getContent();
		} else {
			return new ArrayList<>();
		}
	}
	
	public User userById(Long id) {
		User user = userRepository.findById(id).orElseThrow(
	            () -> new UsernameNotFoundException("User not found with id : " + id)
	        );
		
		return user;
				
	}
	
}
