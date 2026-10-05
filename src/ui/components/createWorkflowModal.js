
export function openCreateWorkflowModal({ onSave } = {}) {
  // Remove existing modal if any
  const existing = document.getElementById("create-workflow-modal");
  if (existing) {
    existing.remove();
  }

  const backdrop = document.createElement("div");
  backdrop.id = "create-workflow-modal";
  backdrop.className = "modal-backdrop";

  backdrop.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-header">
        <div>
          <h2 id="modal-title" class="modal-title">Create New Workflow</h2>
          <p class="modal-subtitle">Set a name and description for your new API workflow.</p>
        </div>
        <button class="modal-close-btn" id="modal-btn-close" title="Close modal" aria-label="Close">✕</button>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label class="form-label" for="new-wf-name">
            Workflow Name <span class="required">*</span>
          </label>
          <input 
            type="text" 
            id="new-wf-name" 
            class="form-input" 
            placeholder="e.g. Daily Order Monitor" 
            autocomplete="off"
          />
          <span class="form-error-msg" id="new-wf-name-error">Please enter a workflow name.</span>
        </div>

        <div class="form-group">
          <label class="form-label" for="new-wf-desc">Description</label>
          <textarea 
            id="new-wf-desc" 
            class="form-textarea" 
            placeholder="Briefly describe what this workflow automates..."
          ></textarea>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-outline" id="modal-btn-cancel">Cancel</button>
        <button type="button" class="btn btn-primary" id="modal-btn-save">Save Workflow</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  // Trigger animation next frame
  requestAnimationFrame(() => {
    backdrop.classList.add("open");
  });

  const nameInput = backdrop.querySelector("#new-wf-name");
  const descInput = backdrop.querySelector("#new-wf-desc");
  const nameError = backdrop.querySelector("#new-wf-name-error");
  const btnClose = backdrop.querySelector("#modal-btn-close");
  const btnCancel = backdrop.querySelector("#modal-btn-cancel");
  const btnSave = backdrop.querySelector("#modal-btn-save");

  // Auto-focus input
  setTimeout(() => nameInput.focus(), 50);

  function closeModal() {
    backdrop.classList.remove("open");
    setTimeout(() => {
      if (backdrop.parentNode) {
        backdrop.parentNode.removeChild(backdrop);
      }
    }, 200);
    document.removeEventListener("keydown", handleKeyDown);
  }

  function handleSave() {
    const name = nameInput.value.trim();
    const description = descInput.value.trim();

    if (!name) {
      nameInput.classList.add("error");
      nameError.classList.add("visible");
      nameInput.focus();
      return;
    }

    if (typeof onSave === "function") {
      onSave({ name, description });
    }

    closeModal();
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  }

  // Clear validation on type
  nameInput.addEventListener("input", () => {
    if (nameInput.value.trim()) {
      nameInput.classList.remove("error");
      nameError.classList.remove("visible");
    }
  });

  // Listeners
  btnSave.addEventListener("click", handleSave);
  btnCancel.addEventListener("click", closeModal);
  btnClose.addEventListener("click", closeModal);

  // Close when clicking directly on the backdrop (outside modal card)
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  document.addEventListener("keydown", handleKeyDown);
}
