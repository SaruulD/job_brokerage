package mn.num.saruul.jobBrokerage.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.Job;
import mn.num.saruul.jobBrokerage.models.SentResumes;

@Repository
public interface JobRepository extends  JpaRepository<Job, Long>, PagingAndSortingRepository<Job, Long> {
	Optional<Job> findById(Long jobId);
	
	Page<Job> findByCreatedBy(Long userId, Pageable pageable);
	
	long countByCreatedBy(Long userId);
	
	List<Job> findByIdIn(List<Long> jobIds);
	
	List<Job> findByIdIn(List<Long> jobIds, Sort sort);
	
	@Query("SELECT j FROM Job j WHERE j.company.id = :companyId")
	List<Job> findByCompanyId(@Param("companyId") Long companyId);
	
	@Query("SELECT COUNT(j) FROM Job j WHERE j.company.id = :companyId")
	Integer findByCompanyIdCount(@Param("companyId") Long companyId);
	
	@Query("SELECT j FROM Job j ORDER BY j.createdDate DESC")
	List<Job> findAll();
	
	Page<Job> findAll(Pageable pageable);
	
	@Query("SELECT j FROM Job j WHERE (:searchText is null or j.job_title LIKE %:searchText%) and "
			+ "(:catId is null or j.category_id = :catId) and (:typeId is null or j.job_type_id = :typeId) and "
			+ "(:dateId is null or DATEDIFF(curdate(), j.createdDate) < :dateId)")
	Page<Job> searchJobs(@Param("searchText") String searchText, @Param("catId") Integer catId, 
			@Param("typeId") Integer typeId, @Param("dateId") Integer dateId, Pageable pageable);
	  
    @Query(value="SELECT COUNT(*) FROM sent_resumes s INNER JOIN jobs j ON j.id = s.job_id WHERE j.id = :jobId", nativeQuery = true)
    Integer findJobResume(Long jobId);
    
    @Query(value="SELECT * FROM jobs as j INNER JOIN user_fav_jobs u ON u.job_id = j.id WHERE u.user_id = :userId", nativeQuery = true)
    List<Job> favList(Long userId);
    
    @Query(value="SELECT s FROM SentResumes s WHERE s.job_id = :jobId")
    List<SentResumes> jobResumes(Long jobId);
}
