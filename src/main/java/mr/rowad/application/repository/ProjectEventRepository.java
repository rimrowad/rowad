package mr.rowad.application.repository;

import mr.rowad.application.domain.ProjectEvent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ProjectEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectEventRepository extends JpaRepository<ProjectEvent, Long>, JpaSpecificationExecutor<ProjectEvent> {

    @Query("select project_event from ProjectEvent project_event where project_event.user.login = ?#{principal.username}")
    List<ProjectEvent> findByUserIsCurrentUser();

}
