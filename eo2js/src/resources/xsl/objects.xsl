<?xml version="1.0" encoding="UTF-8"?>
<!--
 * SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
 * SPDX-License-Identifier: MIT
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:eo="https://www.eolang.org" id="objects" version="2.0">
  <!--
  Wrap absract objects or atoms with <object> element
                               <object>
  <o abstract="" name="x"/> =>   <o abstract="" name="x"/>
                               </object>

  Also handles EO 0.59.0 XMIR format where root is <object> instead of <program>
  -->
  <xsl:output encoding="UTF-8" method="xml"/>
  <xsl:template match="/object">
    <xsl:element name="program">
      <xsl:variable name="pkg" select="metas/meta[head='package']/part[1]"/>
      <xsl:variable name="objName" select="o[1]/@name"/>
      <xsl:attribute name="name">
        <xsl:choose>
          <xsl:when test="$pkg">
            <xsl:value-of select="concat($pkg, '.', $objName)"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="$objName"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
      <xsl:apply-templates select="@*[name()!='name']"/>
      <xsl:apply-templates select="metas"/>
      <xsl:apply-templates select="listing"/>
      <xsl:apply-templates select="comments"/>
      <xsl:apply-templates select="sheets"/>
      <xsl:apply-templates select="errors"/>
      <xsl:element name="objects">
        <xsl:apply-templates select="o"/>
      </xsl:element>
    </xsl:element>
  </xsl:template>
  <xsl:template name="serialize">
    <xsl:param name="node"/>
    <xsl:param name="indent"/>
    <xsl:variable name="name" select="name($node)"/>
    <xsl:value-of select="$indent"/>
    <xsl:text>&lt;</xsl:text>
    <xsl:value-of select="$name"/>
    <xsl:for-each select="$node/@*">
      <xsl:text> </xsl:text>
      <xsl:value-of select="name()"/>
      <xsl:text>="</xsl:text>
      <xsl:value-of select="."/>
      <xsl:text>"</xsl:text>
    </xsl:for-each>
    <xsl:variable name="content" select="replace(text()[1], '^\s*(.+?)\s*$', '$1')"/>
    <xsl:if test="$content = '' and not($node/element())">
      <xsl:text>/</xsl:text>
    </xsl:if>
    <xsl:text>&gt;</xsl:text>
    <xsl:value-of select="$content"/>
    <xsl:if test="$node/element()">
      <xsl:for-each select="$node/element()">
        <xsl:value-of select="'&#10;'"/>
        <xsl:call-template name="serialize">
          <xsl:with-param name="node" select="."/>
          <xsl:with-param name="indent" select="concat($indent, '  ')"/>
        </xsl:call-template>
      </xsl:for-each>
      <xsl:value-of select="'&#10;'"/>
      <xsl:value-of select="$indent"/>
    </xsl:if>
    <xsl:if test="$content != '' or $node/element()">
      <xsl:text>&lt;/</xsl:text>
      <xsl:value-of select="$name"/>
      <xsl:text>&gt;</xsl:text>
    </xsl:if>
  </xsl:template>
  <xsl:template match="o[not(exists(@base)) and (exists(o) or @atom or @abstract)]">
    <xsl:element name="object">
      <xsl:apply-templates select="node()|@*"/>
      <xsl:element name="xmir">
        <xsl:call-template name="serialize">
          <xsl:with-param name="node" select="."/>
          <xsl:with-param name="indent" select="''"/>
        </xsl:call-template>
      </xsl:element>
    </xsl:element>
  </xsl:template>
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>
