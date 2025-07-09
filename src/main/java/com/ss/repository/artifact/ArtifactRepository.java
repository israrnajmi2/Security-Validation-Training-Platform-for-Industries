package com.ss.repository.artifact;

import com.ss.domain.artifact.Artifact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtifactRepository extends JpaRepository<Artifact, Integer> {

    List<Artifact> findByObjectTypeAndElementIdAndIsArchivedFalse(String objectType, Integer elementId);

    List<Artifact> findByIsArchivedFalse();

}
