package mn.num.saruul.jobBrokerage.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.Education;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
	
	@Query("SELECT e FROM Education e WHERE e.user.id = :userId ORDER BY e.startAt")
	List<Education> findAllEducation(@Param("userId")Long userId);
	
	Optional<Education> findById(Long id);
}
