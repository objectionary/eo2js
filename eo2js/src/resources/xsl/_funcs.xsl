<?xml version="1.0" encoding="UTF-8"?>
<!--
 * SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
 * SPDX-License-Identifier: MIT
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:eo="https://www.eolang.org" xmlns:xs="http://www.w3.org/2001/XMLSchema" id="_funcs" version="2.0">
  <xsl:function name="eo:has-data" as="xs:boolean">
    <xsl:param name="o" as="element()"/>
    <xsl:sequence select="normalize-space(string-join($o/text(), '')) != ''"/>
  </xsl:function>
</xsl:stylesheet>
