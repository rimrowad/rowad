package mr.rowad.application.repository;

import mr.rowad.application.domain.TeamMember;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the TeamMember entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long>, JpaSpecificationExecutor<TeamMember> {

    @Query("select team_member from TeamMember team_member where team_member.user.login = ?#{principal.username}")
    List<TeamMember> findByUserIsCurrentUser();

}
