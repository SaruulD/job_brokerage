package mn.num.saruul.jobBrokerage.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.Language;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long>{

	@Query("SELECT l FROM Language l WHERE l.user.id = :userId ORDER BY l.name")
	List<Language> findAllLanguages(@Param("userId")Long userId);
	
	Optional<Language> findById(Long id);
}
