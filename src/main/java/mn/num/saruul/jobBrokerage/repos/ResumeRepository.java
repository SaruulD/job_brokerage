package mn.num.saruul.jobBrokerage.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.Resume;

@Repository
public interface ResumeRepository extends  JpaRepository<Resume, Long> {
	Optional<Resume> findById(Long resumeId);
	
//	Page<Resume> findByCreatedBy(UUID userUuid, Pageable pageable);
//	
//	long countByCreatedBy(UUID userUuid);
	
	List<Resume> findByIdIn(List<Long> resumeIds);
	
	List<Resume> findByIdIn(List<Long> resumeIds, Sort sort);
	
	@Query("SELECT r FROM Resume r WHERE r.user.id = :userId")
    List<Resume> findResumeByUserId(@Param("userId") Long userId);

}
