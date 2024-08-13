async function updatePod() {
    const url = 'https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl';
    commentText = document.getElementById("commentText").value;
    author = document.getElementById("userName").value;
    id = document.getElementById("commentButton").className;
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
    preRdf = await readFromPod(url)
    // parse ttl into store
    store = $rdf.graph()
    $rdf.parse(preRdf, store, url, 'text/turtle')

    // create a list of all AO('Annotation')
    let annotations = store.each(undefined, RDF('type'), AO('Annotation'))
    // calculate the next annotation number
    let nextAnnoNumber = annotations.length + 1

    //create new annotation
    newAnno = $rdf.sym(`https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl/anno${nextAnnoNumber}`)
    newConcept = $rdf.sym(`https://restaurierungsvokabular.solidweb.org/annotations//concept${id}`)

    // add annotation to store
    store.add(newAnno, RDF('type'), AO('Annotation'))
    // add newConcept if not already in store
    if (!store.holds(newConcept, RDF('type'), SK('Concept'))) {
        store.add(newConcept, RDF('type'), SK('Concept'))
    }
    store.add(newAnno, value, commentText)
    store.add(newAnno, creator, author)
    store.add(newAnno, created, new Date().toISOString())
    store.add(newAnno, target, newConcept)

    // serialize store into ttl
    let ttl = $rdf.serialize(null, store, url, 'text/turtle')

    // write ttl to pod
    writeToPod(ttl, url)

    //unused
    /*
    var concept = SK('Concept')
    var thesaurus = SK('ConceptScheme')
    var annotation = AO('Annotation')
    var motivation = AO("motivatedBy")
    */
}