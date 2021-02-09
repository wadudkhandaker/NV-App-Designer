var parserApp = angular.module("parserApp");
parserApp.service('static', function() {

    this.NEWLINE = "\n";
    this.SPACE = " ";
    this.TAB = "    ";

    this.WHILE_TYPES = {
      while: "while",
      count: "count",
      endless: "endless"
    };

    this.NODE_NAME = {
      root: "root",
      play: "play",
      record: "record",
      getkey: "getKey",
      menu: "menu",
      repeat: "repeat",
      hang: "hang",
      dial: "dial",
      case: "case",
      let: "letNode",
      week: "week",
      year: "year",
      do: "doNode",
      test: "test",
      return: "return",
      exec: "exec",
      break: "break",
      sequence: "sequence"
    };

    this.NVT_FILE_HEADER = "/****************************************************************************\\\n";
    this.NVT_FILE_HEADER += "*                                                                            *\n";
    this.NVT_FILE_HEADER += "* Module : %s   *\n";
    this.NVT_FILE_HEADER += "*                                                                            *\n";
    this.NVT_FILE_HEADER += "* NVD Application                                                            *\n";
    this.NVT_FILE_HEADER += "*                                                                            *\n";
    this.NVT_FILE_HEADER += "*                                                                            *\n";
    this.NVT_FILE_HEADER += "*                                                                            *\n";
    this.NVT_FILE_HEADER += "* Generated by : NewVoice Designer 2.0                                       *\n";
    this.NVT_FILE_HEADER += "* Date : %s *\n";
    this.NVT_FILE_HEADER += "* Author :                                                                   *\n";
    this.NVT_FILE_HEADER += "* Purpose :                                                                  *\n";
    this.NVT_FILE_HEADER += "* Comment :                                                                  *\n";
    this.NVT_FILE_HEADER += "*                                                                            *\n";
    this.NVT_FILE_HEADER += "* WARNING: This is a generated source-code file.                             *\n";
    this.NVT_FILE_HEADER += "*          You shouldn't edit this file, unless you're                       *\n";
    this.NVT_FILE_HEADER += "*          sure, you won't use the NVD file anymore.                         *\n";
    this.NVT_FILE_HEADER += "*                                                                            *\n";
    this.NVT_FILE_HEADER += "\\****************************************************************************/\n";

});