import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = (props) => {
    const {dataEditor, setDataEditor} = props;
    
    return (
        <div>
            <CKEditor 
                editor={ClassicEditor}
                data={dataEditor}
                onready={
                    editor => {
                        editor.editing.view.change((write) => {
                            write.setStyle(
                                "height",
                                "200px",
                                editor.editing.view.document.getRoot()
                            );
                        })
                    }
                }
                onChange={(e, editor) => {
                    const data = editor.getData();
                    setDataEditor(data);
                }}
            />
        </div>
        
    )
}

export default Editor;