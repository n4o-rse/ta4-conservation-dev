async function updatePod(url) {
    // declare namespaces
    var AO = $rdf.Namespace("http://www.w3.org/ns/oa#")
    var DC = $rdf.Namespace("http://purl.org/dc/terms/")
    var SK = $rdf.Namespace("http://www.w3.org/2004/02/skos/core#")
    var RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#")

    // declare entities
    var comment = AO("bodyValue")
    var target = AO("hasTarget")
    var creator = DC("creator")
    var created = DC("created")

    // 
    preRdf = await readFromPod(url)
    // parse ttl into store
    store = $rdf.graph()
    $rdf.parse(preRdf, store, url, 'text/turtle')

    //create new annotation
    anno2 = $rdf.sym("https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl/anno2")
    concept1 = $rdf.sym("https://restaurierungsvokabular.solidweb.org/annotations//concept1")

    // add annotation to store
    store.add(anno2, RDF('type'), AO('Annotation'))
    store.add(concept1, RDF('type'), SK('Concept'))
    store.add(anno2, comment, 'I disapprove this definition as well!')
    store.add(anno2, creator, 'Lasse Mempel')
    store.add(anno2, created, new Date().toISOString())
    store.add(anno2, target, concept1)

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

const url = 'https://restaurierungsvokabular.solidweb.org/annotations/annotations.ttl';
updatePod(url)