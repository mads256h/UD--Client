//Global configuration.
const conf =
{
    activeConversationClass: "IWI4RYB-d-r IWI4RYB-d-G IWI4RYB-d-O IWI4RYB-d-f IWI4RYB-b-c IWI4RYB-b-l IWI4RYB-d-k IWI4RYB-b-k",
    updateRate: 100,

    commentClass: "always-visible IWI4RYB-b-s ps-container ps-active-y",

    commentChainWrapperClass: "IWI4RYB-d-r IWI4RYB-d-k IWI4RYB-d-f IWI4RYB-d-t IWI4RYB-d-N",

    commentWrapperClass: "IWI4RYB-d-r IWI4RYB-d-O IWI4RYB-d-k IWI4RYB-d-f IWI4RYB-b-p IWI4RYB-d-t",

    commentNameClass: "gwt-InlineHTML IWI4RYB-b-b IWI4RYB-b-o green",

    commentTextClass: "gwt-HTML IWI4RYB-b-G",

    commentReplyTimeWrapperClass: "IWI4RYB-d-r IWI4RYB-d-G IWI4RYB-d-O IWI4RYB-d-k IWI4RYB-d-f",

    commentReplyClass: "gwt-HTML IWI4RYB-b-F IWI4RYB-b-o",

    commentTimeWrapperClass: "IWI4RYB-b-g IWI4RYB-b-h",

    commentTimeClass: "gwt-HTML",

    uddataMagicStyle: "flex: 0 1 auto;"
};
//Function that runs itself. It makes sure that we don't pollute the namespace with our variables.
(function main()
{
    console.log("UD- starting");

    document.documentElement.addEventListener('commentsget', onCommentsGet, false);

    let conversationId = 0;

    setInterval(function() {
        if (document.getElementsByClassName(conf.activeConversationClass).length) {
            let activeConversationId = document.getElementsByClassName(conf.activeConversationClass)[0].__listener.j.k;
            if (conversationId === 0 || activeConversationId !== conversationId) {
                conversationId = activeConversationId;
                onConversationChange(conversationId);
            }
        }
    }, conf.updateRate);
})();


function onConversationChange(conversationId)
{
    console.log("Conversation change: " + conversationId);

    removeComments();
    createComments(conversationId);
}

function removeComments()
{
    let event = new CustomEvent('cancelrequest');
    document.documentElement.dispatchEvent(event);

    let comments = document.getElementById("ud--commentsection");
    if (comments !== undefined && comments !== null)
        comments.remove();
}

function createComments(conversationId)
{
    let event = new CustomEvent('sendrequest', { detail: conversationId });

    document.documentElement.dispatchEvent(event);
}

function onCommentsGet(e)
{
    let comments = document.createElement("div");
    comments.className = conf.commentChainWrapperClass;
    comments.id = "ud--commentsection";
    comments.style = conf.uddataMagicStyle;

    let json = JSON.parse(e.detail);

    json.forEach(function(obj) {
        let commentWrapper = document.createElement("div");
        //commentWrapper.innerText = "ID: " + obj.Id + " Name: " + obj.Name + " Time:" + obj.Time + " Text: " + obj.Text;
        commentWrapper.className = conf.commentWrapperClass;
        commentWrapper.style = conf.uddataMagicStyle;


            let commentNameTextWrapper = document.createElement("div");
            commentNameTextWrapper.style = conf.uddataMagicStyle;


                let commentName = document.createElement("span");
                commentName.className = conf.commentNameClass;
                commentName.innerText = obj.Name;

                let commentText = document.createElement("div");
                commentText.className = conf.commentTextClass;
                commentText.innerText = obj.Text;

                commentNameTextWrapper.appendChild(commentName);
                commentNameTextWrapper.appendChild(commentText);



            let commentReplyTimeWrapper = document.createElement("div");
            commentReplyTimeWrapper.className = conf.commentReplyTimeWrapperClass;
            commentReplyTimeWrapper.style = conf.uddataMagicStyle;

                let commentReply = document.createElement("div");
                commentReply.className = conf.commentReplyClass;
                commentReply.style = conf.uddataMagicStyle;
                commentReply.innerText = "Svar";

                let commentTimeWrapper = document.createElement("div");
                commentTimeWrapper.className = conf.commentTimeWrapperClass;
                commentTimeWrapper.style = conf.uddataMagicStyle;

                    let commentTime = document.createElement("div");
                    commentTime.className = conf.commentTimeClass;
                    commentTime.innerText = obj.Time;

                    commentTimeWrapper.appendChild(commentTime);

                commentReplyTimeWrapper.appendChild(commentReply);
                commentReplyTimeWrapper.appendChild(commentTimeWrapper);

            commentWrapper.appendChild(commentNameTextWrapper);
            commentWrapper.appendChild(commentReplyTimeWrapper);

        comments.appendChild(commentWrapper);
    });



    document.getElementsByClassName(conf.commentClass)[0].parentElement.appendChild(comments);
}