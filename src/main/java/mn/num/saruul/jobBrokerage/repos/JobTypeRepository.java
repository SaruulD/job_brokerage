package mn.num.saruul.jobBrokerage.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.JobType;

@Repository
public interface JobTypeRepository extends JpaRepository<JobType, Integer> {
	List<JobType> findAll();
	
	Optional<JobType> findById(Integer jobTypeId);
}
