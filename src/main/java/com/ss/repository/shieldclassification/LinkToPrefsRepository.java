package com.ss.repository.shieldclassification;


import com.ss.domain.shieldclassification.LinkToPrefs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LinkToPrefsRepository extends JpaRepository<LinkToPrefs, Integer> {
    List<LinkToPrefs> findByIsDirectModeAndShieldIdOneAndObjectTypeOne(boolean isDirectMode, Integer shieldIdOne, String objectTypeOne);
    List<LinkToPrefs> findByIsDirectModeAndShieldIdTwoAndObjectTypeTwo(boolean isDirectMode, Integer shieldIdTwo, String objectTypeTwo);
    List<LinkToPrefs> findByIsDirectModeAndShieldIdOneAndObjectTypeOneAndShieldIdTwoAndObjectTypeTwo(boolean isDirectMode, Integer shieldIdOne, String objectTypeOne, Integer shieldIdTwo, String objectTypeTwo);
}
