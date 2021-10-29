package mn.num.saruul.jobBrokerage.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.Experience;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {

	@Query("SELECT e FROM Experience e WHERE e.user.id = :userId ORDER BY e.startAt")
	List<Experience> findAllExperiences(@Param("userId")Long userId);
	
	Optional<Experience> findById(Long id);
}
