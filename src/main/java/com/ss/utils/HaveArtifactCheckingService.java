package com.ss.utils;

import com.ss.domain.artifact.Artifact;
import com.ss.repository.artifact.ArtifactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("HaveArtifactCheckingService")
public class HaveArtifactCheckingService {

    @Autowired
    private ArtifactRepository artifactRepository;

    public Boolean isHaveArtifact(Integer elementId, String objectType) {

        List<Artifact> artifacts = artifactRepository.findByObjectTypeAndElementIdAndIsArchivedFalse(objectType, elementId);
        if (artifacts != null && !artifacts.isEmpty()) {
            return true;
        }
        return false;
    }
}
