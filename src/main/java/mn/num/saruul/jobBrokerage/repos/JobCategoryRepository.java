package mn.num.saruul.jobBrokerage.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.JobCategory;

@Repository
public interface JobCategoryRepository extends JpaRepository<JobCategory, Integer> {
	List<JobCategory> findAll();

	Optional<JobCategory> findById(Integer jobCatId);
}
