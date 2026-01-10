"use client"
function name(params) {
    return(<>
    // badges 
        <Badge
        color="red"
        size="small"
        emphasis="high"
        checkPosition="start"
        text="Badge"
      />

      <Badge
        color="blue"
        size="medium"
        emphasis="high"
        checkPosition="start"
        text="Verified"
      />
      <Badge
        color="green"
        size="large"
        emphasis="medium"
        checkPosition="end"
        text="Badge"
      />

      {/* buttons  */}
      <div className="w-[90%]">
        {/* Carousel Container */}
        <div className="overflow-x-auto py-10">
          <div
            className="flex gap-4 scroll-pl-4 snap-x snap-mandatory overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {mentors.map((mentor, index) => (
              <div
                key={index}
                className="snap-start shrink-0"
                style={{ width: "calc(100%/3.5)" }} // 3.5 cards visible
              >
                <MentorCard {...mentor} />
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="text-center mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition">
            See All Mentors
          </button>
        </div>
      </div>
      {/* stats section */}
      <Button
        text="Primary Small"
        variant="PrimarySmallButton"
        onClick={() => alert("Saved")}
      />
      <Button
        text="Secondary Small Outlined Button"
        variant="PrimarySmallOutlinedButton"
        onClick={() => alert("Saved")}
        className="ml-6 "
      />
      <Button
        text="Primary Large"
        variant="PrimaryLargeButton"
        onClick={() => alert("Saved")}
        className="m-6"
      />
      <Button
        text="Primary Large Outlined Button"
        variant="PrimaryLargeOutlinedButton"
        onClick={() => alert("Saved")}
        className="ml-6"
      />
      <Button
        text="Secondary Small Button"
        variant="SecondarySmallButton"
        onClick={() => alert("Saved")}
        className="ml-6"
      />
      <Button
        text="Secondary Small Outlined Button"
        variant="SecondarySmallOutlinedButton"
        onClick={() => alert("Saved")}
        className="m-6"
      />
      <Button
        text="Secondary Large Button"
        variant="SecondaryLargeButton"
        onClick={() => alert("Saved")}
        className="ml-6"
      />
      <Button
        text=" Secondary Large Outlined Button"
        variant="SecondaryLargeOutlinedButton"
        onClick={() => alert("Saved")}
        className="ml-6"
      />
      <div className="bg-[url('/media/stats.png')] bg-cover bg-no-repeat h-80 w-full">
        {/* <img className="mx-auto" src="/media/statsicon.png" alt="" />
        <p className="mx-auto text-center text-2xl font-semibold text-default mt-10 w-[47%]">
          Trusted by 1000+ students who found the most required help while
          deciding on a career option for their future
        </p> */}
      </div>
</>
    )
}