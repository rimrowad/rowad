package mr.rowad.application.repository;

import mr.rowad.application.domain.Parameter;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Parameter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParameterRepository extends JpaRepository<Parameter, Long>, JpaSpecificationExecutor<Parameter> {

}
