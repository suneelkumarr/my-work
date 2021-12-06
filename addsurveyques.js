const db = require("../../config/connectDB");

const {
  AddQues,
  Addopt,
  addGrid,
  addNum,
} = require("../../Helper/QuestionHelper");

const fetch = require("node-fetch");
const ErrorResponse = require("../../utils/ErrorResponse");
const sendResponse = require("../../utils/sendResponse");
const SurveyContent = db.SurveyContent;
const CampaignContent = db.CampaignContent;
const ContentSurvey = db.ContentSurvey;
const DefaultQuestions = db.DefaultQuestions;
const ContentFiles = db.Contentfiles;
const SurveyQuestion = db.SurveyQuestion;
const TestCategories = db.TestCategories;
const QuestionOptions = db.QuestionOptions;
const DefaultQuestionMetric = db.DefaultQuestionMetric;
const QuestionNumeric = db.QuestionNumeric;
const QuestionGrid = db.QuestionGrid;
const ContentSegment = db.ContentSegment;
const QuestionImport = db.QuestionImport;



// create the pre and post type and survey and update them
async function addSurvey(req, res, content) {
  //concat the survey name with the cnt_id
  let survey_name;

  if (req.body.survey_name) {
    survey_name = req.body.survey_name;
  } else {
    survey_name = content.cnt_name.concat(" ").concat(req.body.surveytype);
  }

  let survey;
  let surveycontent;

  //create and update survey and survey content
  if (content.surveys.length === 0) {
    survey = await ContentSurvey.create({
      cns_comp_id: content.cnt_comp_id,
      cns_survey_name: survey_name,
      cns_type: req.body.surveytype,
    });

    surveycontent = await SurveyContent.create({
      cns_id: survey.cns_id,
      cnt_id: content.cnt_id,
    });

    return survey;
  } else if (
    (content.surveys.length === 1) &&req.body.surveytype === "pre" 
  ) {
    //filter if pre survey availabe or  not
    let getcns = content.surveys.filter(
      (survey) =>
        survey["dataValues"]["cns_type"] === "pre"
    );


    //if  pre survey availabe or not  then create or update data
    if (getcns.length === 0) {
      survey = await ContentSurvey.create({
        cns_comp_id: content.cnt_comp_id,
        cns_survey_name: survey_name,
        cns_type: req.body.surveytype,
      });

      surveycontent = await SurveyContent.create({
        cns_id: survey.cns_id,
        cnt_id: content.cnt_id,
      });

      return survey;
    } else if (getcns.length === 1) {

      let getcns1 = getcns.filter(
        (survey) =>
          survey["dataValues"]["cns_type"] === "pre"
      )[0].cns_id;

      //find the survey and create and update them
      survey = await ContentSurvey.findOne({
        where: {
          cns_id: getcns1,
        },
      }).then((data) => {
        return data.update({
          cns_comp_id: content.cnt_comp_id,
          cns_survey_name: survey_name,
          cns_type: req.body.surveytype,
        });
      });

      surveycontent = await SurveyContent.findOne({
        where: { cns_id: survey.cns_id },
      }).then((data) => {
        if (!data) {
          return SurveyContent.create({
            cns_id: survey.cns_id,
            cnt_id: content.cnt_id,
          });
        }
        return data.update({
          cns_id: survey.cns_id,
          cnt_id: content.cnt_id,
        });
      });
    }
  } else if (
    (content.surveys.length === 1) &&
    (req.body.surveytype === "post")
  ) {
    //filter if pre survey availabe or  not
    let getcns = content.surveys.filter(
      (survey) =>
        survey["dataValues"]["cns_type"] === "post"
    );


    //if  pre survey availabe or not  then create or update data
    if (getcns.length === 0) {
      survey = await ContentSurvey.create({
        cns_comp_id: content.cnt_comp_id,
        cns_survey_name: survey_name,
        cns_type: req.body.surveytype,
      });

      surveycontent = await SurveyContent.create({
        cns_id: survey.cns_id,
        cnt_id: content.cnt_id,
      });

      return survey;
    } else if (getcns.length === 1) {

      let getcns1 = getcns.filter(
        (survey) =>
          survey["dataValues"]["cns_type"] === "post"
      )[0].cns_id;

      //find the survey and create and update them
      survey = await ContentSurvey.findOne({
        where: {
          cns_id: getcns1,
        },
      }).then((data) => {
        return data.update({
          cns_comp_id: content.cnt_comp_id,
          cns_survey_name: survey_name,
          cns_type: req.body.surveytype,
        });
      });

      surveycontent = await SurveyContent.findOne({
        where: { cns_id: survey.cns_id },
      }).then((data) => {
        if (!data) {
          return SurveyContent.create({
            cns_id: survey.cns_id,
            cnt_id: content.cnt_id,
          });
        }
        return data.update({
          cns_id: survey.cns_id,
          cnt_id: content.cnt_id,
        });
      });
    }
  } else if (
    content.surveys.length === 2 &&
    (req.body.surveytype === "pre")
  ) {

    //filter if pre survey availabe or  not
    let getcns = content.surveys.filter(
      (survey) =>
        survey["dataValues"]["cns_type"] === "pre"
    );

    console.log(getcns, getcns.length);

    //if  pre survey availabe or not  then create or update data
    if (getcns.length === 1) {

      let getcns1 = getcns.filter(
        (survey) =>
          survey["dataValues"]["cns_type"] === "pre"
      )[0].cns_id;

      //find the survey and create and update them
      survey = await ContentSurvey.findOne({
        where: {
          cns_id: getcns1,
        },
      }).then((data) => {
        return data.update({
          cns_comp_id: content.cnt_comp_id,
          cns_survey_name: survey_name,
          cns_type: req.body.surveytype,
        });
      });

      surveycontent = await SurveyContent.findOne({
        where: { cns_id: survey.cns_id },
      }).then((data) => {
        if (!data) {
          return SurveyContent.create({
            cns_id: survey.cns_id,
            cnt_id: content.cnt_id,
          });
        }
        return data.update({
          cns_id: survey.cns_id,
          cnt_id: content.cnt_id,
        });
      });
    }
  } else if (
    content.surveys.length === 2 &&
    ( req.body.surveytype === "post")
  ) {

    //filter if pre survey availabe or  not
    let getcns = content.surveys.filter(
      (survey) =>
        survey["dataValues"]["cns_type"] === "post"
    );

    //if  pre survey availabe or not  then create or update data
    if (getcns.length === 1) {

      let getcns1 = getcns.filter(
        (survey) =>survey["dataValues"]["cns_type"] === "post"
      )[0].cns_id;

      //find the survey and create and update them
      survey = await ContentSurvey.findOne({
        where: {
          cns_id: getcns1,
        },
      }).then((data) => {
        return data.update({
          cns_comp_id: content.cnt_comp_id,
          cns_survey_name: survey_name,
          cns_type: req.body.surveytype,
        });
      });

      surveycontent = await SurveyContent.findOne({
        where: { cns_id: survey.cns_id },
      }).then((data) => {
        if (!data) {
          return SurveyContent.create({
            cns_id: survey.cns_id,
            cnt_id: content.cnt_id,
          });
        }
        return data.update({
          cns_id: survey.cns_id,
          cnt_id: content.cnt_id,
        });
      });
    }
  }
  return surveycontent, survey;
}

// repeate the process of child questions and their options and create the survey
async function createSurvey(req, res, next, opt_id, child, cns_id) {
  if (!child) {
    child = cns_id
      ? await ContentSurvey.findOne({
          where: {
            cns_id: cns_id,
          },
        })
      : await isCntID(req, res, next);
  }

  if (child) {
    let survey = [];
    survey.push(child);
    const data = await addSurveyQuestion(
      req,
      res,
      next,
      survey,
      cns_id,
      opt_id
    );
    return data;
  }

  return res.status(200).send({ message: "something went to wrong" });
}

async function isCntID(req, res, next) {
  if (req.body.cnt_id) {
    let cnt = await CampaignContent.findOne({
      where: { cnt_id: req.body.cnt_id },
      include: {
        model: ContentSurvey,
        as: "surveys",
        where: { cns_type: req.body.surveytype },
      },
    });
    let survey = cnt.surveys;

    if (survey ?? null) {
      return survey;
    } else {
      if (req.body.seg_time) {
        survey = await ContentSegment.findOne({
          where: {
            cns_id: cnt.cns_id,
            seg_time: req.body.seg_time,
          },
        });
        if (req.body.instream_of) {
          const survey = await ContentSegment.findOne({
            where: {
              cns_id: cnt.cns_id,
              instream_of: req.body.instream_of,
            },
          });

          survey = survey[0];
          if (survey) return survey;
        }
      }
      survey = await addSurvey(req, res, next);
      if (req.body.surveytype === "segment") {
        survey = await ContentSegment.findOne({
          where: {
            cns_id: cnt.cns_id,
            seg_time: req.body.seg_time,
          },
        }).then(async (data) => {
          if (!data) {
            return await ContentSegment.create({
              cns_id: survey[0].cns_id,
              cnt_id: req.body.cnt_id,
              seg_time: req.body.seg_time,
              instream_of: req.body.instream_of,
            });
          }

          return data.update({
            cns_id: survey[0].cns_id,
            cnt_id: req.body.cnt_id,
            seg_time: req.body.seg_time,
            instream_of: req.body.instream_of,
          });
        });
      } else {
        survey = await CampaignContent.findOne({
          where: {
            cnt_id: req.body.cnt_id,
          },
        }).then(async (data) => {
          if (!data) {
            CampaignContent.create({ cnt_id: req.body.cnt_id });
          }
          return data.update({ cnt_id: req.body.cnt_id });
        });
      }
      return survey;
    }
  } else {
    return await addSurvey(req, res, next);
  }
}

//add the survey question and their options with nth term of child
async function addSurveyQuestion(
  req,
  res,
  next,
  survey,
  cns_id,
  opt_id = null
) {
  let option;
  //check opt_id is available or not
  if (opt_id && opt_id !== null) {
    option = await QuestionOptions.findOne({
      where: {
        opt_id: opt_id,
      },
    });
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  //return boolean value of strings is match or not
  function matches(string, substring) {
    return string.toLowerCase().indexOf(substring.toLowerCase()) != -1;
  }

  survey.forEach(async (input) => {
    let opt;
    let grid;

    //GET THE QUESTIONS
    let question = await AddQues(
      req,
      res,
      next,
      input,
      cns_id,
      opt_id ? opt_id : null
    ); //create single question

    if (question) {
      let metrics;
  
      //CHECK THE DEFAULT QUESTIONS AND GET THEM
      if (input.dq_id && input.dq_id !== undefined) {
        metrics = await DefaultQuestionMetric.findOne({
          where: {
            dm_dq_id: input.dq_id,
          },
        });
      }

      //add children
      if (option && option !== null) {
        question.qs_child_of_opt = option.opt_id;
        await question.save();
      }

      //is_default updated 1 when default question is created
      if (input.dq_id) {
        question.isDefault = 1;
        await question.save();
      }

      //options
      if (
        ["single", "image", "multiple", "grid", "grid-multiple"].includes(
          input.questionType
        )
      ) {
        input.options.forEach(async (option) => {
          //fetch the options with questions
          opt = await Addopt(req, res, next, option, question.qs_id);

          if (option.children && option.children.length > 0) {
            option.children.forEach(async (child) => {
              await createSurvey(req, res, next, opt.opt_id, child, cns_id);
            });
          }
          //  End the children questions
          if (metrics && metrics !== null) {
            if (metrics.dm_opt !== null) {
              const search = "/";
              const replaceWith = " ";
              const res = option.option.split(search).join(replaceWith);

              if (matches(res, metrics.dm_opt)) {
                metrics.dataValues.opt_id = opt.opt_id;
                await delay(1000);
              }
            }
          }
        });
      }

      if (["grid", "grid-multiple"].includes(input.questionType)) {
        input.values.forEach(async (gridvalue) => {
          grid = await addGrid(req, res, next, gridvalue, question.qs_id);
          //Default question import detail collect grid tag
          if (metrics && metrics !== null) {
            if (metrics.gr_grid !== null) {
              const search = "/";
              const replaceWith = " ";
              const res = gridvalue.option.split(search).join(replaceWith);
              if (matches(res, metrics.dm_opt)) {
                metrics.dataValues.gr_id = grid.gr_id;
                await delay(1000);
              }
            }
          }
        });
      }

      await delay(1000);

      if (metrics) {
        question.dataValues.metricsTagging = await metricsTagging(
          metrics,
          question.qs_id
        );
        question.isDefault = 1;
        question.save();
      }

      if (input.questionType === "numeric") {
        await addNum(req, res, next, input, question.qs_id);
      }
    }
    
  });
}

async function metricsTagging(metrics, qs_id) {
  let qusimport = await QuestionImport.create({
    im_qs_id: qs_id,
    im_dq_id: metrics.dm_dq_id,
    im_opt_tag: metrics.dataValues.opt_id ?? null,
    im_gr_tag: metrics.dataValues.gr_id ?? null,
    im_category: metrics.dm_category,
  });
  return qusimport;
}

//find the questions data with options and update their value
async function findquestions(cns_id) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  await delay(300);

  let questions = await SurveyQuestion.findAll({
    where: {
      qs_cns_id: cns_id,
    },
    attributes: ["qs_id", "qs_question", "qs_type", "qs_flags"],
    include: [
      {
        model: QuestionOptions,
        as: "options",
        attributes: ["opt_id", "opt_option", "opt_type", "opt_flags"],
        nested: true,
        include: [
          {
            model: SurveyQuestion,
            as: "children",
            attributes: ["qs_id", "qs_question", "qs_type", "qs_flags"],
            include: [
              {
                model: QuestionOptions,
                as: "options",
                attributes: ["opt_id", "opt_option", "opt_type", "opt_flags"],
              },
              {
                model: QuestionGrid,
                as: "values",
              },
              { model: QuestionNumeric ,
              },
            ],
          },
        ],
      },
      {
        model: QuestionGrid,
        as: "values",
      },
      { model: QuestionNumeric,
      },
      { model: QuestionImport,
      },
    ],
  });

  let assetData = []; 

  questions.forEach((data) => {
    if (["single", "image", "multiple", "freetext"].includes(data.qs_type)) {
      let opt = [];

      //fetch question option and store value of opt
      data.options.forEach((option) => {
        //store the children question options
        let children = [];

        //value of question options
        let options = {
          opt_id: option.opt_id,
          option: option.opt_option,
          type: option.opt_type,
          opt_flags: JSON.parse(option.opt_flags),
          children: children,
        };

        //fetch the children questions with their options and store the data children
        option.children.forEach((child) => {
          //check the type of child questions
          if (
            ["single", "image", "multiple", "freetext"].includes(child.qs_type)
          ) {
            //store the child options
            let childdata = [];

            let importdata;

            data.QuestionImports.forEach((impdata) => {
              importdata = {
                im_id: impdata.im_id,
                im_qs_id: impdata.im_qs_id,
                im_dq_id: impdata.im_dq_id,
                im_opt_tag: impdata.im_opt_tag,
                im_gr_tag: impdata.im_gr_tag,
                im_category: impdata.im_category,
              };
            });

            //store the child options
            child.options.forEach((option) => {
              let childs = {
                opt_id: option.opt_id,
                option: option.opt_option,
                type: option.opt_type,
                opt_flags: JSON.parse(option.opt_flags),
                children: option.children,
              };
              childdata.push(childs);
            });

            //store the child questions
            let data1 = {
              qs_id: child.qs_id,
              question: child.qs_question,
              questionType: child.qs_type,
              qs_flags: JSON.parse(child.qs_flags),
              import_check: importdata,
              options: childdata,
            };
            //push the child questions and options data in children
            children.push(data1);
          } else if (
            child.qs_type === "grid" ||
            child.qs_type === "grid-multiple"
          ) {
            let opt = [];
            let value = [];

            // filter the options data as we want
            child.options.forEach((option) => {
              let options = {
                opt_id: option.opt_id,
                option: option.opt_option,
                type: option.opt_type,
                opt_flags: JSON.parse(option.opt_flags),
                children: option.children,
              };
              //push data in questions options
              opt.push(options);
            });

            //filter the values  data as we want
            child.values.forEach((val) => {
              let values = {
                gr_id: val.gr_id,
                type: val.gr_type,
                gr_flags: JSON.parse(val.gr_flags),
                option: val.gr_value,
              };
              value.push(values);
            });

            let data2 = {
              qs_id: child.qs_id,
              question: child.qs_question,
              questionType: child.qs_type,
              qs_flags: JSON.parse(child.qs_flags),
              options: opt,
              values: value,
            };
            children.push(data2);
          } else if (child.qs_type === "numeric") {
            let num = {};
            child.QuestionNumerics.forEach((number) => {
              num["num_id"] = number.num_id;
              num["num_value"] = number.num_value;
              num["not_like"] = number.num_not_like;
              num["extreme_like"] = number.num_extreme_like;
            });

            let data3 = {
              qs_id: child.qs_id,
              question: child.qs_question,
              questionType: child.qs_type,
              qs_flags: JSON.parse(child.qs_flags),
              ...num,
            };

            children.push(data3);
          }
        });

        //store the questions options and push the data in opt
        opt.push(options);
      });
      let importdata;

      data.QuestionImports.forEach((impdata) => {
        importdata = {
          im_id: impdata.im_id,
          im_qs_id: impdata.im_qs_id,
          im_dq_id: impdata.im_dq_id,
          im_opt_tag: impdata.im_opt_tag,
          im_gr_tag: impdata.im_gr_tag,
          im_category: impdata.im_category,
        };
      });
      //question data with options
      let data1 = {
        qs_id: data.qs_id,
        question: data.qs_question,
        questionType: data.qs_type,
        qs_flags: JSON.parse(data.qs_flags),
        import_check: importdata,
        options: opt,
      };

      assetData.push(data1);
    } else if (data.qs_type === "grid" || data.qs_type === "grid-multiple") {
      let opt = [];
      let value = [];
      // filter the options data as we want
      data.options.forEach((option) => {
        let options = {
          opt_id: option.opt_id,
          option: option.opt_option,
          type: option.opt_type,
          opt_flags: JSON.parse(option.opt_flags),
          children: option.children,
        };
        //push data in questions options
        opt.push(options);
      });

      //filter the values  data as we want
      data.values.forEach((val) => {
        let values = {
          gr_id: val.gr_id,
          type: val.gr_type,
          gr_flags: JSON.parse(val.gr_flags),
          option: val.gr_value,
        };
        value.push(values);
      });

      let data2 = {
        qs_id: data.qs_id,
        question: data.qs_question,
        questionType: data.qs_type,
        qs_flags: JSON.parse(data.qs_flags),
        options: opt,
        values: value,
      };
      assetData.push(data2);
    } else if (data.qs_type === "numeric") {
      let num = {};
      data.QuestionNumerics.forEach((number) => {
        num["num_id"] = number.num_id;
        num["num_value"] = number.num_value;
        num["not_like"] = number.num_not_like;
        num["extreme_like"] = number.num_extreme_like;
      });

      let data3 = {
        qs_id: data.qs_id,
        question: data.qs_question,
        questionType: data.qs_type,
        qs_flags: JSON.parse(data.qs_flags),
        ...num,
      };

      assetData.push(data3);
    }
  });

  return assetData;
}

//create a survey that create survey , question and options
async function createSurData(req, res, next) {
  if (!req.body.cnt_id || isNaN(req.body.cnt_id)) {
    return res.status(200).send({
      error: false,
      code: 400,
      message: "Content ID required and must be a number",
      response: [],
    });
  }
  let survey;
  let contentsegment;

  if (req.body.surveytype === "segment") {
    //find the content with the cnt_id and segment attach with them
    const content = await CampaignContent.findOne({
      where: { cnt_id: req.body.cnt_id },
      include: {
        model: ContentSurvey,
        as: "segment",
      },
    });

    //check the content is not empty
    if (!content) {
      return res.status(404).send("Content not found");
    }

    let survey_name;
    //concat the survey name with the cnt_id
    if (req.body.survey_name) {
      survey_name = req.body.survey_name;
    } else {
      survey_name = content.cnt_name.concat(" ").concat(req.body.surveytype);
    }

    // check the segment length
    if (content.segment.length === 0) {
      // create the content survey
      survey = await ContentSurvey.create({
        cns_comp_id: content.cnt_comp_id,
        cns_survey_name: survey_name,
        cns_type: req.body.surveytype,
      });

      contentsegment = await ContentSegment.create({
        cns_id: survey.cns_id,
        cnt_id: content.cnt_id,
        seg_time: req.body.seg_time,
        instream_of: req.body.instream_of,
      });

    } else {
      //filter the cns_id from the content segment
      let cns_id = content.segment.filter(
        (survey) => survey["dataValues"]["cns_type"] === req.body.surveytype
      )[0].cns_id;

      //find cretae update the ContentSurvey
      survey = await ContentSurvey.findOne({
        where: {
          cns_id: cns_id,
        },
      }).then((data) => {
        if (!data) {
          return ContentSurvey.create({
            cns_comp_id: content.cnt_comp_id,
            cns_survey_name: survey_name,
            cns_type: req.body.surveytype,
          });
        }
        return data.update({
          cns_comp_id: content.cnt_comp_id,
          cns_survey_name: survey_name,
          cns_type: req.body.surveytype,
        });
      });

      // find cretae and update the ContentSegment
      contentsegment = await ContentSegment.findOne({
        where: {
          cns_id: survey.cns_id,
        },
      }).then(async (data) => {
        if (!data) {
          return ContentSegment.create({
            cns_id: survey.cns_id,
            cnt_id: content.cnt_id,
            seg_time: req.body.seg_time,
            instream_of: req.body.instream_of,
          });
        }
        return data.update({
          cns_id: survey.cns_id,
          cnt_id: content.cnt_id,
          seg_time: req.body.seg_time,
          instream_of: req.body.instream_of,
        });
      });
    }
  } else {
    //check the cnt_id us available or not
    const content = await CampaignContent.findOne({
      where: { cnt_id: req.body.cnt_id },
      include: {
        model: ContentSurvey,
        as: "surveys",
      },
    });

    //check the length of the survey
    if (content.surveys.length === 0) {
      survey = await addSurvey(req, res, content);
    } else if (content.surveys.length === 1) {
      survey = await addSurvey(req, res, content);
    }else if (content.surveys.length === 2) {
      survey = await addSurvey(req, res, content);
    }
  }


  //add survey question options edit and update them
  const data = await addSurveyQuestion(
    req,
    res,
    next,
    req.body.survey,
    survey.cns_id
  );

  //find the all questions with survey id  with the realtionship of nth terms
  const assetData = await findquestions(survey.cns_id);

  let resData = {
    cns_id: survey.cns_id,
    survey_name: survey.cns_survey_name,
    surveytype: survey.cns_type,
    survey: assetData,
    seg_time: req.body.seg_time,
    instream_of: req.body.instream_of,
  };

  res.status(200).send({
    error: false,
    code: 200,
    message: "Segments list fetched",
    response: [resData],
  });
}

// get the segment type question options and survey value
async function getSegment(req, res, next) {
  if (!req.body.cnt_id || isNaN(req.body.cnt_id)) {
    return res.status(200).send({
      error: false,
      code: 400,
      message: "Content ID required and must be a number",
      response: [],
    }); 

  }

  //check the cnt_id us available or not
  const content = await CampaignContent.findOne({
    where: { cnt_id: req.body.cnt_id },
    include: {
      model: ContentSurvey,
      as: "segment",
    },
  });

  //console.log(content.segment);
  if (!content) {
    return res.status(404).send("Content not found");
  }

  let survey = content.segment[0]["dataValues"];

  let segvalue =
    content.segment[0]["dataValues"]["ContentSegment"]["dataValues"];

  if (req.body.instream_of) {
    segvalue = content.segment[0]["dataValues"]["ContentSegment"]["dataValues"];
  }

  const assetData = await findquestions(survey.cns_id);

  let data = {
    cns_id: survey.cns_id,
    survey_name: survey.cns_survey_name,
    surveytype: survey.cns_type,
    survey: assetData,
    seg_time: segvalue.seg_time,
    instream_of: segvalue.instream_of,
  };

  res.status(200).send({
    error: false,
    code: 200,
    message: "Segments list fetched",
    response: [data],
  });
}

async function getSurvey(req, res, next) {
  let cns
  let msg

  if(req.body.surveytype === "segment") {
       //check the cnt_id us available or not
      const content = await CampaignContent.findOne({
        where: { cnt_id: req.body.cnt_id },
        include: {
          model: ContentSurvey,
          as: "segment",
        },
      });

      if(content.segment.length === 0){
        return res.status(200).send({
          error: false,
          code: 200,
          message: "Content Segment not found",
          response: [],
        });
      }

     cns = content.segment.filter((data) => data["dataValues"]["cns_type"] === req.body.surveytype)[0]
     msg = "Segments list fetched"
  } else{
       //check the cnt_id us available or not
      const content = await CampaignContent.findOne({
        where: { cnt_id: req.body.cnt_id },
        include: {
          model: ContentSurvey,
          as: "surveys"
        },
      });

      if(content.surveys.length === 0){
       return res.status(200).send({
          error: false,
          code: 200,
          message: "Content Survey not found",
          response: [],
        });
      }
      
     cns = content.surveys.filter((data) => data["dataValues"]["cns_type"] === req.body.surveytype)[0]
     msg = "Survey list fetched"
  }

    const assetData = await findquestions(cns.cns_id);

    let resData = {
      cns_id: cns.cns_id,
      survey_name: cns.cns_survey_name,
      surveytype: cns.cns_type,
      survey: assetData,
      seg_time: req.body.seg_time,
      instream_of: req.body.instream_of,
    };
  
    res.status(200).send({
      error: false,
      code: 200,
      message: msg,
      response: [resData],
    });
}

module.exports = {
  createSurData,
  getSegment,
  getSurvey
};
