package mn.num.saruul.jobBrokerage.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.Sum;

@Repository
public interface SumRepository extends JpaRepository<Sum, Long> {
	@Query("SELECT s FROM Sum s WHERE s.aimag.id = :aimag_id")
	List<Sum> findByAimagId(@Param("aimag_id") Long aimag_id);
}
