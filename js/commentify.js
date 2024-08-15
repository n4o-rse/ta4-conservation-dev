async function updatePod() {
    event.preventDefault();
    const url = 'https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl';
    let commentText = document.getElementById("commentText").value;
    let author = document.getElementById("userName").innerHTML;
    let id = document.getElementById("commentButton").className;
    console.log(`commentText: ${commentText}, author: ${author}, id: ${id}`);

    // declare namespaces
    var AO = $rdf.Namespace("http://www.w3.org/ns/oa#");
    var DC = $rdf.Namespace("http://purl.org/dc/terms/");
    var SK = $rdf.Namespace("http://www.w3.org/2004/02/skos/core#");
    var RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");

    // declare entities
    var value = AO("bodyValue")
    var target = AO("hasTarget")
    var creator = DC("creator")
    var created = DC("created")

    // read ttl from pod
    let preRdf = await readFromPod(url)
    
    // parse ttl into store
    let store = $rdf.graph()
    $rdf.parse(preRdf, store, url, 'text/turtle')

    // create a list of all AO('Annotation')
    let annotations = store.each(undefined, RDF('type'), AO('Annotation'))
    // calculate the next annotation number
    let nextAnnoNumber = annotations.length + 1
    console.log(`nextAnnoNumber: ${nextAnnoNumber}`)

    //create new annotation
    let newAnno = $rdf.sym(`https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl/anno${nextAnnoNumber}`)
    let newConcept = $rdf.sym(`https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl/concept${id}`)
    console.log(`newAnno: ${newAnno}, newConcept: ${newConcept}`)

    // add annotation to store
    store.add(newAnno, RDF('type'), AO('Annotation'))
    // add newConcept if not already in store
    if (!store.holds(newConcept, RDF('type'), SK('Concept'))) {
        store.add(newConcept, RDF('type'), SK('Concept'))
    }
    var newDate = new Date().toISOString()
    store.add(newAnno, value, commentText)
    store.add(newAnno, creator, author)
    store.add(newAnno, created, newDate)
    store.add(newAnno, target, newConcept)

    // serialize store into ttl
    let ttl = $rdf.serialize(null, store, url, 'text/turtle')

    // write ttl to pod
    writeToPod(ttl, url)

    // if element exists with id "noCommentsPlaceholder" remove it
    if (document.getElementById("noCommentsPlaceholder") != null) {
        document.getElementById("noCommentsPlaceholder").remove();
    }

    // add new comment to commentaries in modal
    var commentDiv = document.getElementsByClassName("modal-comments")[0];
    var newComment = document.createElement("p");
    newComment.innerHTML = "<b>creator:</b> " + author + "<br><b>created:</b> " + newDate  + "<br><b>comment:</b> " + commentText;
    // integrate new comment at the top of the list
    commentDiv.insertBefore(newComment, commentDiv.firstChild);
    document.getElementById("commentText").value = "";
}