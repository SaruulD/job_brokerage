package mn.num.saruul.jobBrokerage.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mn.num.saruul.jobBrokerage.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    List<User> findByIdIn(List<Long> userIds);
    
    @Query(value = "SELECT u FROM User u WHERE :id = u.id")
    Optional<User> findById(@Param("id") Long id);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
	
    @Query(value="SELECT COUNT(*) FROM user_fav_jobs u WHERE u.user_id = :id AND u.job_id = :jobId", nativeQuery = true)
    Integer existsInFavList(@Param("id") Long id, @Param("jobId") Long jobId);
    
    @Query(value="SELECT * FROM users u WHERE u.username LIKE %:username% LIMIT 10", nativeQuery = true)
    List<User> searchUser(String username);
}
