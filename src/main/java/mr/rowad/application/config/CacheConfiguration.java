package mr.rowad.application.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(mr.rowad.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(mr.rowad.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(mr.rowad.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(mr.rowad.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(mr.rowad.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(mr.rowad.application.domain.Parameter.class.getName(), jcacheConfiguration);
            cm.createCache(mr.rowad.application.domain.Team.class.getName(), jcacheConfiguration);
            cm.createCache(mr.rowad.application.domain.TeamMember.class.getName(), jcacheConfiguration);
            cm.createCache(mr.rowad.application.domain.Investor.class.getName(), jcacheConfiguration);
            cm.createCache(mr.rowad.application.domain.ProjectFile.class.getName(), jcacheConfiguration);
            cm.createCache(mr.rowad.application.domain.ProjectEvent.class.getName(), jcacheConfiguration);
            cm.createCache(mr.rowad.application.domain.Project.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
