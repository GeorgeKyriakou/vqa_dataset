# Code description

## Index:

1. [load metadata json file](#load_metadata_json_file)
2. [load_templates](#load_templates)

# Start main

## load_metadata_json_file

open metadata => load json into variable (note: think fs system)

search in metadata for functions => get functions_by_name,
create new key value pair in metadata with metadata['_functions_by_name'] = [...function.name]

---

## load_templates

create template object, by looping through all files under TEMPLATES folder, using `key` with the pair of `(file_name.json,position_in_arr)` with following structure:

```json
{
  "templates": [
    (file_name.json,position_in_arr):   {
      "params": [],
      "text": [],
      "nodes": [],
      "constraints": []
    },
  ]
}
```

---

## reset_counts()

initialize values for measuring number of questions per template, because we can...
