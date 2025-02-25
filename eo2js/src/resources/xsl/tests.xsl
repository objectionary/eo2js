<?xml version="1.0" encoding="UTF-8"?>
<!--
 * SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
 * SPDX-License-Identifier: MIT
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:eo="https://www.eolang.org" xmlns:xs="http://www.w3.org/2001/XMLSchema" id="tests" version="2.0">
  <!--
  This stylesheet will take outer objects and put them into
  classes that are unit tests.
  -->
  <xsl:output encoding="UTF-8" method="xml"/>
  <!-- Name of the object -->
  <xsl:function name="eo:name" as="xs:string">
    <xsl:param name="n" as="xs:string"/>
    <xsl:variable name="parts" select="tokenize($n, '\$')"/>
    <xsl:variable name="p">
      <xsl:for-each select="$parts">
        <xsl:if test="position()&gt;1">
          <xsl:text>$</xsl:text>
        </xsl:if>
        <xsl:value-of select="."/>
      </xsl:for-each>
    </xsl:variable>
    <xsl:value-of select="$p"/>
  </xsl:function>
  <xsl:template match="object/@name">
    <xsl:attribute name="name">
      <xsl:choose>
        <xsl:when test="//meta[head='tests']">
          <xsl:value-of select="eo:name(.)"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="."/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:attribute>
  </xsl:template>
  <xsl:template match="o/@base">
    <xsl:variable name="a" select="."/>
    <xsl:variable name="ourRef" select="parent::o/@ref"/>
    <xsl:attribute name="{name()}">
      <xsl:choose>
        <xsl:when test="//meta[head='tests']">
          <xsl:choose>
            <xsl:when test="//object[@name=$a and @line=$ourRef]">
              <xsl:value-of select="eo:name($a)"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="."/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="."/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:attribute>
  </xsl:template>
  <xsl:template match="object/@parent">
    <xsl:variable name="a" select="."/>
    <xsl:attribute name="{name()}">
      <xsl:choose>
        <xsl:when test="//meta[head='tests']">
          <xsl:choose>
            <xsl:when test="//object[@name=$a]">
              <xsl:value-of select="eo:name($a)"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="."/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="."/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:attribute>
  </xsl:template>
  <xsl:template match="object" mode="#all">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
      <xsl:if test="//meta[head='tests']">
        <xsl:variable name="c" select="."/>
        <xsl:apply-templates select="//object[@parent=$c/@name]" mode="copy"/>
      </xsl:if>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="objects/object[@parent]" mode="#default">
    <xsl:choose>
      <xsl:when test="//meta[head='tests']">
        <!-- kill them -->
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy>
          <xsl:apply-templates select="node()|@*"/>
        </xsl:copy>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template match="node()|@*" mode="#all">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>
