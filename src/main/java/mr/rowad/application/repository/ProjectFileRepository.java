package mr.rowad.application.repository;

import mr.rowad.application.domain.ProjectFile;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProjectFile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectFileRepository extends JpaRepository<ProjectFile, Long>, JpaSpecificationExecutor<ProjectFile> {

}
