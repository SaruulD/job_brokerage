package mn.num.saruul.jobBrokerage.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.Profile;
import mn.num.saruul.jobBrokerage.repos.ProfileRepository;

@Repository
public class ProfileDAO {

	@Autowired
	ProfileRepository profileRepository;
	
	public boolean createProfile(Profile profile) {
		profileRepository.save(profile);
		if (profile.getId() != null) {
			return true;
		}
		return false;
	}
}
