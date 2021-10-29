package mn.num.saruul.jobBrokerage.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.JobPostedDate;

@Repository
public interface JobPostedDateRepository extends JpaRepository<JobPostedDate, Long> {
	List<JobPostedDate> findAll();
}
