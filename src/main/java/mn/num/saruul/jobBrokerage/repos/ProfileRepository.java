package mn.num.saruul.jobBrokerage.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
	Optional<Profile> findById(Long profileId);
	
	List<Profile> findByIdIn(List<Profile> profileIds);
	
	List<Profile> findByIdIn(List<Profile> profileIds, Sort sort);
	
	@Query("SELECT p FROM Profile p WHERE p.user.id = :userId")
	Optional<Profile> findByUserId(@Param("userId") Long userId);
}
 