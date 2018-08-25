package mr.rowad.application.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import mr.rowad.application.domain.ProjectFile;
import mr.rowad.application.domain.*; // for static metamodels
import mr.rowad.application.repository.ProjectFileRepository;
import mr.rowad.application.service.dto.ProjectFileCriteria;


/**
 * Service for executing complex queries for ProjectFile entities in the database.
 * The main input is a {@link ProjectFileCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link ProjectFile} or a {@link Page} of {@link ProjectFile} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ProjectFileQueryService extends QueryService<ProjectFile> {

    private final Logger log = LoggerFactory.getLogger(ProjectFileQueryService.class);

    private final ProjectFileRepository projectFileRepository;

    public ProjectFileQueryService(ProjectFileRepository projectFileRepository) {
        this.projectFileRepository = projectFileRepository;
    }

    /**
     * Return a {@link List} of {@link ProjectFile} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<ProjectFile> findByCriteria(ProjectFileCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<ProjectFile> specification = createSpecification(criteria);
        return projectFileRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link ProjectFile} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<ProjectFile> findByCriteria(ProjectFileCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<ProjectFile> specification = createSpecification(criteria);
        return projectFileRepository.findAll(specification, page);
    }

    /**
     * Function to convert ProjectFileCriteria to a {@link Specification}
     */
    private Specification<ProjectFile> createSpecification(ProjectFileCriteria criteria) {
        Specification<ProjectFile> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), ProjectFile_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), ProjectFile_.name));
            }
            if (criteria.getPath() != null) {
                specification = specification.and(buildStringSpecification(criteria.getPath(), ProjectFile_.path));
            }
            if (criteria.getType() != null) {
                specification = specification.and(buildStringSpecification(criteria.getType(), ProjectFile_.type));
            }
            if (criteria.getProjectId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getProjectId(), ProjectFile_.project, Project_.id));
            }
        }
        return specification;
    }

}
