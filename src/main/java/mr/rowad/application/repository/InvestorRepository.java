package mr.rowad.application.repository;

import mr.rowad.application.domain.Investor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Investor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvestorRepository extends JpaRepository<Investor, Long>, JpaSpecificationExecutor<Investor> {

    @Query("select investor from Investor investor where investor.user.login = ?#{principal.username}")
    List<Investor> findByUserIsCurrentUser();

}
