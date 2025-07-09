package com.ss.repository.parametertree;

import com.ss.domain.parametertree.MethodParameterWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MethodParameterWordRepository extends JpaRepository<MethodParameterWord, Integer> {
    List<MethodParameterWord> findByLevelAndIsArchivedFalse(Integer level);

    List<MethodParameterWord> findByWordAndIsArchivedFalse(String name);

    @Query("SELECT max(at.level) FROM MethodParameterWord at WHERE isArchived = false")
    Integer getMaxLevel();
}
