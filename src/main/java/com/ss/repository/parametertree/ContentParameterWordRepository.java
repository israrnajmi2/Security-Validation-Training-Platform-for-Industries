package com.ss.repository.parametertree;

import com.ss.domain.parametertree.ContentParameterWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContentParameterWordRepository extends JpaRepository<ContentParameterWord, Integer> {
    List<ContentParameterWord> findByLevelAndIsArchivedFalse(Integer level);

    List<ContentParameterWord> findByWordAndIsArchivedFalse(String name);

    @Query("SELECT max(at.level) FROM ContentParameterWord at WHERE isArchived = false")
    Integer getMaxLevel();
}
