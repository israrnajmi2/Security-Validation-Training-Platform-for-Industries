package com.ss.repository.sce;

import com.ss.domain.sce.SecurityControlExpression;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SecurityControlExpressionRepository extends JpaRepository<SecurityControlExpression, Integer> {

    List<SecurityControlExpression> findByIsArchivedFalse();

    List<SecurityControlExpression> findByObjectiveParameterWordIdAndMethodParameterWordIdAndContentParameterWordIdAndSubjectParameterWordIdAndIsArchivedFalse(Integer objectiveParameterWordId, Integer methodParameterWordId, Integer contentParameterWordId, Integer subjectParameterWordId);

    @Query(value = "select * from security_control_expression where id in (select sce_fk from asset_delivers_sce where asset_fk = :assetId and is_archived = false) and id in (select sce_fk from sce_fulfills_shield_element where shield_element_fk = :elementId and is_archived = false)", nativeQuery = true)
    List<SecurityControlExpression> findExpressionsByAssetAndElementDirectEndPoints(@Param("assetId") Integer assetId, @Param("elementId") Integer elementId);

    @Query(value = "select * from security_control_expression where id in (select sce_fk from sce_fulfills_shield_element where shield_element_fk = :elementIdOne and is_archived = false) and id in (select sce_fk from sce_fulfills_shield_element where shield_element_fk = :elementIdTwo and is_archived = false)", nativeQuery = true)
    List<SecurityControlExpression> findExpressionsByElementAndElementDirectEndPoints(@Param("elementIdOne") Integer elementIdOne, @Param("elementIdTwo") Integer elementIdTwo);

    @Query(value = "select * from security_control_expression where id in (select sce_fk from asset_type_protected_by_sce where asset_type_fk = :assetTypeId and is_archived = false) and id in (select sce_fk from sce_fulfills_shield_element where shield_element_fk = :elementId and is_archived = false)", nativeQuery = true)
    List<SecurityControlExpression> findExpressionsByAssetTypeAndElementDirectEndPoints(@Param("assetTypeId") Integer assetTypeId, @Param("elementId") Integer elementId);
}
